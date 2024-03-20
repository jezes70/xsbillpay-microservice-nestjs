
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { IS_PUBLIC_KEY } from '../utils/security';
import { WalletRepository } from '../domain/repository/wallet.repository';
import { APPID } from '../domain/enums/app.enums';
dotenv.config();
const secret=process.env.JWT_SECRET as string;
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector,private walletRepository: WalletRepository) {} 
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
              context.getHandler(),
              context.getClass(),
            ]);
            if (isPublic) {
         
              return true;
            }
        
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: secret
          }
        );
  
        request['user'] = payload;
        const appID = payload['appID']
        const email = payload['username']      
        console.log(APPID.XBILL)
   
        if (!APPID.XBILL.toString()===appID) {
            throw new Error('Invalid appID');
          }
        const check = await this.walletRepository.checkApp(APPID.XBILL,email)
        if(check){
        console.log(payload)

        return true;
        }else{
            throw new UnauthorizedException();
        }
  
      } catch {
        throw new UnauthorizedException();
      }
  
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }