import { IHttpResponseCommon } from "./interfaces/http_response.interface";
import { Response as Res } from 'express';
import { Response, HttpStatus } from '@nestjs/common';

export class HttpResponseCommon {

    static response200 = (response: Res, data, message?: string): void=> {
        
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.OK,
            data: data,
            message: (message)?message: "Request successfully.",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }


    static response201 = (response: Res, data, message?: string): void => {
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.CREATED,
            data: data,
            message: (message)?message: "Request successfully (Created/Updated).",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }

    static response401 = (response: Res, data: any, message?: string): void=> {
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.UNAUTHORIZED,
            data: data,
            message: (message)?message: "Request, Unauthorized.",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }

    static response404 = (response: Res, data: any, message?: string): void=> {
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.NOT_FOUND,
            data: data,
            message: (message)?message: "Request, Not Found.",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }

    static response409 = (response: Res, data: any, message?: string): void=> {
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.CONFLICT,
            data: data,
            message: (message)?message: "Request, Conflict.",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }

    static response500 = (response: Res, data: any, message?: string): void=> {
        const responseCommon: IHttpResponseCommon =  {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            data: data,
            message: (message)?message: "Request Error.",
            date: new Date()
        }
        response.status(responseCommon.statusCode);
        response.send(responseCommon);
    }
    
}