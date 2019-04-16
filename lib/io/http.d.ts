import { Result, Action } from "../application/structure";
export declare namespace Http {
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
export declare const jsonResponse: <T extends Result>(status: Http.Status) => (result: T) => Http.Response<T>;
//# sourceMappingURL=http.d.ts.map