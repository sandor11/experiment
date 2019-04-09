import { Ride } from "../../domain/ride";
import { RideRepository } from "../../app/get-owner-rides";

export class InMemoryRideRepository implements RideRepository {
  findByOwner(owner: string) {
    return [new Ride(owner)];
  }
}
