import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { RegisterDto } from "../../domain/dto/user.registerDto";
import { LoginDto } from "../../domain/dto/user.loginDto";
import { AuthService } from "../services/auth.service";
import { VerifyOTPDto } from "../../domain/dto/user.verifyOtp";
import { ResendOTPDto } from "../../domain/dto/user.resend";
import { AuthGuard } from "../../guard/auth.guard";
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseBuilder, ApiResponses } from "../../domain/dto/response/code.api.response";
@ApiTags('users')
@Controller("api/v1")
export class UserController{
    private userService:UserService;
    private authService: AuthService;

    constructor(
        userService:UserService,  authService:AuthService) {
            this.userService=userService;  
             this.authService=authService;
        }
    
        @Post("register")
        @ApiResponse({ status: 200, type: [RegisterDto] })
        @UsePipes(new ValidationPipe())
        createUser(@Body() registerDto: RegisterDto): Promise<ApiResponses<String>>{
    
            return this.userService.createUser(registerDto);
        }

        @Post("login")
        @ApiResponse({ status: 200, type: [LoginDto] })

        @UsePipes(new ValidationPipe())
        loginUser(@Body() loginDto: LoginDto){
    
            return this.authService.signIn(loginDto);
        }

        @Post("verify-otp")
        @ApiResponse({ status: 200, type: [VerifyOTPDto] })

        @UsePipes(new ValidationPipe())
        verifyOTP(@Body() verifyOtp: VerifyOTPDto) {
            return this.userService.verify_otp(verifyOtp);
        }

        
        @Post("resend-otp")
        @ApiResponse({ status: 200, type: [ResendOTPDto] })

        @UsePipes(new ValidationPipe())
        resndOTP(@Body() verifyOtp: ResendOTPDto) {
    
            return this.userService.resendOTP(verifyOtp);
        }

        @Get('agent/:id') 
        @UseGuards(AuthGuard)
             getAgents(@Param('id') id: number) {
            return this.authService.getAgent(id);
        }
}