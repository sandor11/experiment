export declare type Ride = {
    owner: string;
};
export declare type GetOwner = (ride: Ride) => string;
export declare type FindRidesByOwner = (owner: string) => Ride[];
export declare const getOwner: GetOwner;
//# sourceMappingURL=ride.d.ts.map