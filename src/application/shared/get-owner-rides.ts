import { Queries, Results, Handler } from "../";
import { FindRidesByOwner } from "../../domain/ride";

const findRideUseCase = (
  findByOwner: FindRidesByOwner,
  query: Queries.GetOwnerRides
): Results.GetOwnerRidesData => {
  const rides = findByOwner(query.owner);
  return {
    rides
  };
};

export const getOwnerRides = (
  findByOwner: FindRidesByOwner
): Handler<Queries.GetOwnerRides, Results.GetOwnerRidesData> => action =>
  findRideUseCase(findByOwner, action);
