/// <reference types="express" />
declare module "application/structure" {
    export type Action = {};
    export type Command = Action & {};
    export type Query = Action & {};
    export type Result = {};
    export type Success = Result & {};
    export type Failure = Result & {};
    export type Handler<T extends Command | Query, R extends Success | Failure> = (action: T) => R;
}
declare module "domain/greeting" {
    export type Greeting = {
        basic: string;
        extra: string;
    };
    export type Greet = (greeting: Greeting) => string;
    export type FindGreeting = (extra: string) => Greeting;
    export const greet: Greet;
}
declare module "application/shared/say-hello" {
    import { Command, Success, Handler } from "application/structure";
    import { FindGreeting } from "domain/greeting";
    export type SayHello = Command & {
        speech: string;
        other: number;
    };
    export type Hello = Success & {
        hello: string;
    };
    export const sayHelloHandler: (find: FindGreeting) => Handler<{
        speech: string;
        other: number;
    }, {
        hello: string;
    }>;
}
declare module "io/postgres/orm/greeting-model" {
    import { Greeting } from "domain/greeting";
    export class GreetingModel {
        findGreeting(extra: string): Greeting;
    }
}
declare module "io/postgres/greeting" {
    import { FindGreeting } from "domain/greeting";
    export const findGreeting: FindGreeting;
}
declare module "io/http" {
    import { Result, Action } from "application/structure";
    export namespace Http {
        type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
        type Parameter = {
            name: string;
            required: boolean;
            location: "path" | "query" | "body";
        };
        type Headers = {
            [header: string]: string;
        };
        type Status = 200 | 201 | 204 | 400 | 404 | 500 | 502 | 504;
        type Response<T> = {
            statusCode: Status;
            headers?: Headers;
            body: T;
        };
        interface Endpoint<T extends Action, R extends Result> {
            ref: string;
            resource: string;
            description: string;
            method: Method;
            headers: {
                [key: string]: string;
            };
            path: string;
            params: Parameter[];
            parse: (request: any) => T;
            handle: (action: T) => R;
            response: (result: R) => Response<R>;
        }
    }
    export const jsonResponse: <T extends Result>(status: Http.Status) => (result: T) => Http.Response<T>;
}
declare module "io/express/endpoints/hello" {
    import { Http } from "io/http";
    export const HelloEndpoints: Http.Endpoint<{
        speech: string;
        other: number;
    }, {
        hello: string;
    }>[];
}
declare module "domain/ride" {
    export type Ride = {
        owner: string;
    };
    export type GetOwner = (ride: Ride) => string;
    export type FindRidesByOwner = (owner: string) => Ride[];
    export const getOwner: GetOwner;
}
declare module "application/shared/get-owner-rides" {
    import { Query, Success, Handler } from "application/structure";
    import { Ride, FindRidesByOwner } from "domain/ride";
    export type GetOwnerRides = Query & {
        owner: string;
    };
    export type GetOwnerRidesData = Success & {
        rides: Ride[];
    };
    export const getOwnerRidesHandler: (findByOwner: FindRidesByOwner) => Handler<{
        owner: string;
    }, {
        rides: Ride[];
    }>;
}
declare module "io/postgres/ride" {
    import { FindRidesByOwner } from "domain/ride";
    export const findRidesByOwner: FindRidesByOwner;
}
declare module "io/express/endpoints/ride" {
    import { Http } from "io/http";
    export const RideEndpoints: Http.Endpoint<{
        owner: string;
    }, {
        rides: import("domain/ride").Ride[];
    }>[];
}
declare module "io/express/configure" {
    import * as express from "express";
    export const configure: (app: express.Application) => void;
}
declare module "server" { }
//# sourceMappingURL=index.d.ts.map