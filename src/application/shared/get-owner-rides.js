"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findRideUseCase = (findByOwner, command) => {
    const rides = findByOwner(command.owner);
    return {
        rides
    };
};
exports.getOwnerRidesHandler = (findByOwner) => action => findRideUseCase(findByOwner, action);
//# sourceMappingURL=get-owner-rides.js.map