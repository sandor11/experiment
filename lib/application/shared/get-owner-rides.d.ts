import { Query, Success, Handler } from "../structure";
import { Ride, FindRidesByOwner } from "../../domain/ride";
export declare type GetOwnerRides = Query & {
    owner: string;
};
export declare type GetOwnerRidesData = Success & {
    rides: Ride[];
};
export declare const getOwnerRidesHandler: (findByOwner: FindRidesByOwner) => Handler<{
    owner: string;
}, {
    rides: Ride[];
}>;
//# sourceMappingURL=get-owner-rides.d.ts.map