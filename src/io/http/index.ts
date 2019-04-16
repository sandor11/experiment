import { Result, Action, Handler, Success } from "../../application";

export namespace Http {
  export type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  type Parameter = {
    name: string;
    required: boolean;
    location: "path" | "query" | "body";
  };
  export type Headers = {
    [header: string]: string;
  };
  export type Status = 200 | 201 | 204 | 400 | 404 | 500 | 502 | 504;
  export type Response<T extends Result> = {
    statusCode: Status;
    headers?: Headers;
    body: T;
  };

  export type EndpointRequestParser<R, A extends Action> = (r: R) => A;
  export type EndpointResponse<R extends Result> = (r: R) => Response<R>;
  export interface Endpoint<
    TRequest,
    TAction extends Action,
    TResult extends Success
  > {
    ref: string;
    resource: string;
    description: string;
    method: Method;
    headers: {
      [key: string]: string;
    };
    path: string;
    params: Parameter[];
    parse: EndpointRequestParser<TRequest, TAction>;
    handle: Handler<TAction, TResult>;
    success: Status;
  }
}
