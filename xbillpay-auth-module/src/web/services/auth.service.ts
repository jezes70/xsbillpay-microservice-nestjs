import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from '../../domain/dto/user.loginDto';
import { JWTStartegy } from '../../strategy/jwt.strategy';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../../domain/enums/enum.userStatus';
import { ApiResponses, ApiResponseBuilder } from '../../domain/dto/response/code.api.response';
import { UserRepository } from '../../domain/repositories/enity.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private jwtStrategy: JWTStartegy,
    private userRepository: UserRepository,
  ) {}


  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if(user.status==UserStatus.INACTIVE){
        throw new BadRequestException('You need to verify the user');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, appID: 'XBILL-PAY' };
    const token = await this.jwtService.signAsync(payload);

    return { message: 'Successfully logged in', token };
  }

  async  getAgent(id: number): Promise<ApiResponses<any>> {
    try {
        const user= await this.userRepository.findOneById( id );
        if(!user){
            throw new NotFoundException('User not found');
        }
        const userApiResponse = new ApiResponseBuilder<any>()
        .setMessage("Api Recieved")
        .setData({email:user.email,userId:user.id})
        .build();
        console.log(userApiResponse);
        return userApiResponse;
        
    } catch (error) {
        throw new NotFoundException('User not found');
    }
    
}
}
