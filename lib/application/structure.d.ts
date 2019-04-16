export declare type Action = {};
export declare type Command = Action & {};
export declare type Query = Action & {};
export declare type Result = {};
export declare type Success = Result & {};
export declare type Failure = Result & {};
export declare type Handler<T extends Command | Query, R extends Success | Failure> = (action: T) => R;
//# sourceMappingURL=structure.d.ts.map