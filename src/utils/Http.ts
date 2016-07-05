import { Blueberry } from '../core/Blueberry';

export class Http {

}

export enum HttpMethod { Get, Post, Put, Delete }

export class HttpOptions {

    public method: HttpMethod = HttpMethod.Get;
    public data: any = {};
    public headers: any = {};

}