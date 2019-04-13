import { Query, Success, Handler } from "../structure";
import { Ride, FindRidesByOwner } from "../../domain/ride";

export type GetOwnerRides = Query & {
  owner: string;
};

export type GetOwnerRidesData = Success & {
  rides: Ride[];
};

const findRideUseCase = (
  findByOwner: FindRidesByOwner,
  command: GetOwnerRides
): GetOwnerRidesData => {
  const rides = findByOwner(command.owner);
  return {
    rides
  };
};

export const getOwnerRidesHandler = (
  findByOwner: FindRidesByOwner
): Handler<GetOwnerRides, GetOwnerRidesData> => action =>
  findRideUseCase(findByOwner, action);
