import { Query, Success, Handler } from "./core";
import { Ride } from "../domain/ride";

export interface GetOwnerRides extends Query {
  owner: string;
}

export interface GetOwnerRidesData extends Success {
  rides: Ride[];
}

export interface RideRepository {
  findByOwner(owner: string): Ride[];
}

const findRideUseCase = (
  repo: RideRepository,
  command: GetOwnerRides
): GetOwnerRidesData => {
  const rides = repo.findByOwner(command.owner);
  return {
    rides
  };
};

export const getOwnerRidesHandler = (
  repo: RideRepository
): Handler<GetOwnerRides, GetOwnerRidesData> => action =>
  findRideUseCase(repo, action);
