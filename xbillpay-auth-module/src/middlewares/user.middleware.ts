import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class UserMiddleWare implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("athenticate")
       next();
    }
    
}