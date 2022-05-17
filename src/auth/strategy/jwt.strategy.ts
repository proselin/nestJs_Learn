import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { hash } from "argon2";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(
         config: ConfigService, 
         private prisma: PrismaService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }
    // require fucntion for passport jwt
    async validate(payload: {userId : number , email: string}){ 

        // search for user in db 
        const user = await this.prisma.user.findUnique({
            where:{ 
                id: payload.userId ,
                email: payload.email,
            }
        })
        delete user.hash
        return user      
    }

}