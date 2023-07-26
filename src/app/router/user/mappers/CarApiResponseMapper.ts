import { Mapper } from "core/domain/Mapper";
import { Car } from "core/domain/entities/Car";
import { CarResponse } from "core/domain/entities/apiResponse/CarResponse";

export class CarApiResponseMapper implements Mapper<Car, CarResponse>{
    fromDomain(car: Car): CarResponse {
        return {
            model: car.carProps.model,
            picture:car.carProps.picture,
            registration:car.carProps.registration,
            seats:car.carProps.seats,
        }
    }
}