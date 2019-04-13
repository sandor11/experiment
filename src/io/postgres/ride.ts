import { FindRidesByOwner } from "../../domain/ride";

// lets pretent we needed to do some IO here and
// xtract some list of rides out of the database
export const findRidesByOwner: FindRidesByOwner = owner => [{ owner }];
