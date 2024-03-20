import { Injectable, ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { RegisterDto } from "../../domain/dto/user.registerDto";
import { XBILLUserAgent } from "../../domain/entities/user.entity";
import { UserStatus } from "../../domain/enums/enum.userStatus";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../../domain/repositories/enity.repository";
import { RabbitMQService } from "../messanging/rabbitmq.message";
import { OTPRepository } from "../../domain/repositories/otp.repository";
import { XBILLUserOTP } from "../../domain/entities/user.otp";
import { VerifyOTPDto } from "../../domain/dto/user.verifyOtp";
import { ApiResponses, ApiResponseBuilder } from '../../domain/dto/response/code.api.response';
import { ResendOTPDto } from "../../domain/dto/user.resend";
import { PaystackService } from "./account.service";



@Injectable()
export class UserService {
 
    constructor(
        private readonly userRepository: UserRepository,
        private readonly otpRepository: OTPRepository,
        private readonly rabbitMQService: RabbitMQService,
        private readonly paystackService: PaystackService
    ) {}

    async createUser(registerDto: RegisterDto): Promise<ApiResponses<String>> {
        const existingUser = await this.userRepository.findOneByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const newUser = new XBILLUserAgent();
        newUser.firstName = registerDto.firstName;
        newUser.lastName = registerDto.lastName;
        newUser.phone = registerDto.phone;
        newUser.email = registerDto.email;
        newUser.password = hashedPassword;
        newUser.type = registerDto.type;
        newUser.status = UserStatus.INACTIVE;

        try {
            const savedUser = await this.userRepository.saveUser(newUser);
            await this.sendVerificationOTP(savedUser);
            
            const userApiResponse = new ApiResponseBuilder<string>()
            .setMessage("User and OTP retrieved successfully")
            .setData(`${registerDto.firstName} has been successfully registered`)
            .build();
            return userApiResponse;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    private async sendVerificationOTP(user: XBILLUserAgent): Promise<void> {
        const otp = this.generateOTP(4);
        try {
            await this.saveOTPToDatabase(otp, user);
            const queue ="otp_message";
            await this.rabbitMQService.sendMessageOTP({ otp:otp, email:user.email},queue );
        } catch (error) {
            throw new Error('Error sending verification OTP: ' + error.message);
        }
    }

    private generateOTP(length: number): string {
        const chars = '0123456789'; 
        let otp = '';
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length); 
            otp += chars[index];
        }
        return otp;
    }
    

    private async saveOTPToDatabase(otp: string, user: XBILLUserAgent): Promise<void> {
        const saveOTP = new XBILLUserOTP();
        saveOTP.otp = otp;
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);
        saveOTP.date = expirationTime;
        
        saveOTP.user = user;
        
        await this.otpRepository.createOTP(saveOTP);
        user.otp=saveOTP;
        await this.userRepository.saveUser(user)
      }
      

      async verify_otp(otpDto: VerifyOTPDto): Promise<ApiResponses<any>> {

        const user = await this.findOne(otpDto.email);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const XBILLUserOTP = user.otp;
        const currentTime = new Date();
        console.log(user)
        console.log(XBILLUserOTP)
        const expirationTime = XBILLUserOTP.date;
     
        if(currentTime > expirationTime){
          throw new BadRequestException('OTP Have expired');
        }
        if(otpDto.otp!=XBILLUserOTP.otp){
            throw new BadRequestException('Incorrect OTP ');
        }
        user.status=UserStatus.ACTIVE;
        user.otp=null;
        await this.userRepository.saveUser(user);
        await this.otpRepository.deleteOTP(XBILLUserOTP.id);
      const result =  await this.paystackService.createVirtualcustomer(user)
        const userApiResponse = new ApiResponseBuilder<any>()
        .setMessage("User and OTP retrieved successfully")
        .setData(result)
        .build();
        return userApiResponse;
        
        
    
      }

      async resendOTP(resndOTPDto:ResendOTPDto): Promise<ApiResponses<String>>{
        const existingUser = await this.userRepository.findOneByEmail(resndOTPDto.email);
        if (!existingUser) {
            throw new ConflictException('User Not found');
        }
        
        const existingOtp = await this.otpRepository.findOneByOTPUser(existingUser);
        if (existingUser) {
            existingUser.otp=null;
            await this.userRepository.saveUser(existingUser)
        }
        
        await this.sendVerificationOTP(existingUser);
        const userApiResponse = new ApiResponseBuilder<string>()
        .setMessage("Api Recieved")
        .setData(`OTP Have been sent to ${existingUser.email}`)
        .build();
        return userApiResponse;
      }

  


    async findOne(userEmail: string): Promise<XBILLUserAgent | undefined> {
        try {
            return await this.userRepository.findOneByEmail( userEmail );
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }
}
