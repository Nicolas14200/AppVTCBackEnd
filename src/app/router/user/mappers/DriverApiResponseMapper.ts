import { Driver } from "../../../../core/domain/entities/Driver";
import { Mapper } from "../../../../core/domain/Mapper";
import { DriverResponse} from "../../../../core/domain/entities/apiResponse/DriverResponse";

export class DriverApiResponseMapper implements Mapper<Driver, DriverResponse> {
    fromDomain(driver: Driver): DriverResponse {
        return {
            userId : driver.driverProperty.userId,
            car : driver.driverProperty.car,
            identityId : driver.driverProperty.identityId,
            driversLicense : driver.driverProperty.driversLicense,
            insurance : driver.driverProperty.insurance,
            kbis: driver.driverProperty.kbis,
            carRegistrationDocument : driver.driverProperty.carRegistrationDocument,
        }
    }
}