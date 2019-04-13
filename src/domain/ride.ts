// data shape and stucture
export type Ride = {
  owner: string;
};

// define operations over data
export type GetOwner = (ride: Ride) => string;
export type FindRidesByOwner = (owner: string) => Ride[];

// default implementations where no IO is required
export const getOwner: GetOwner = ride => ride.owner;
