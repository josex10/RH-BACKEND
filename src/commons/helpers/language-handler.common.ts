import { Headers } from '@nestjs/common';

export class LanguageHandlerCommon {

    private spanishMessage = {
        WRONG_USERNAME_PASSWORD: 'Usuario/Contraseña incorrecta.'
    }

    private englishMessage = {
        WRONG_USERNAME_PASSWORD: 'Wrong username/password.'
    }
    public fnlanguageHandlerMessage = (headers: Headers, messageKey: string): string=> {
        return this.fnGetMessage(messageKey);
    }

    private fnGetMessage = (key: string): string=>{
        return this.spanishMessage[key];
    }


    
}


