export interface IHttpResponseCommon {
    statusCode: number;
    data: any;
    message?: string;
    date: Date;
}