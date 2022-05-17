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
        console.log(dto);
        
       return this.authService.login()
    }

    @Post('sign-up')   
    signUp(){
       return this.authService.register()
    }
}