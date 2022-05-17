import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}


    @Post('sign-in')
    signIn( @Body() dto: AuthDTO){
        
       return this.authService.login(dto)
    }

    @Post('sign-up')   
    signUp( @Body() dto: AuthDTO){
       return this.authService.register(dto)
    }
}