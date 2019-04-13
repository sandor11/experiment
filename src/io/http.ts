import { Result, Action } from "../application/structure";

export namespace Http {
  export type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  type Parameter = {
    name: string;
    required: boolean;
    location: "path" | "query" | "body";
  };
  type Headers = {
    [header: string]: string;
  };
  export type Status = 200 | 201 | 204 | 400 | 404 | 500 | 502 | 504;
  export type Response<T> = {
    statusCode: Status;
    headers?: Headers;
    body: T;
  };
  export interface Endpoint<T extends Action, R extends Result> {
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

export const jsonResponse = <T extends Result>(status: Http.Status) => (
  result: T
): Http.Response<T> => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json"
  },
  body: result
});
