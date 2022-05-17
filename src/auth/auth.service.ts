import { Injectable } from "@nestjs/common";
@Injectable({})
export class AuthService {

    constructor(){}

    login(){
        return {mes : 'OK'}
    }

    register(){
        return {mes : 'OK'}
    }
}