// wallet.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WalletAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  
    if (req.headers.authorization!=null){
      const token = req.headers.authorization;
      console.log(token)
      if (token && token.startsWith("Bearer ")) {
        req.headers['Authorization'] = `Bearer ${token}`;
      }else{
        throw new UnauthorizedException("Unathorized user")
      }
    }else{
       throw new UnauthorizedException("Access Denied")

    }
    next();
  }
}
