
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

import { APPID } from '../enums/app.enums';
import { BillRepository } from '../domain/repository/bill.respository';
import { IS_PUBLIC_KEY } from '../utils/utils';
dotenv.config();
const secret=process.env.JWT_SECRET as string;
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector,private billRepository: BillRepository) {} 
  
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
      
        console.log(payload)

        return true;
        
  
      } catch {
        throw new UnauthorizedException();
      }
  
    }
  
    public extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }