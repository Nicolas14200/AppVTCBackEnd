
import { driverRouter } from "../router/driver/DriverRouter";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection } from "mongoose";
import request from "supertest";
import { Driver } from "../../core/domain/entities/Driver";
import { DriverRepository } from "core/domain/repositories/DriverRepository";
import { MongodbDriverRepository } from "../../adapters/repositories/mongodb/MongodbDriverRepository";
const app = express();
app.use(express.json());
app.use('/driver', driverRouter);
jest.setTimeout(10000000);
describe('e2e _ DriverRouter', () => {
    let connection: Connection;
    let mongoDbDriverRepo: DriverRepository;
    let driver: Driver;
    let driverId: string;
    beforeAll(async () =>{
        //MongoDb
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(`${uri}VTCProject`)
        connection = await mongoose.createConnection(`${uri}VTCProject`)
        //repo
        mongoDbDriverRepo = new MongodbDriverRepository();
        driver = Driver.create({
            car:"0000",
            carRegistrationDocument:"000",
            driversLicense:"0000",
            identityId:"0000",
            insurance:"0000",
            kbis:"0000",
            userId:"0000",

        })
        driverId = driver.driverProperty.id;
        mongoDbDriverRepo.save(driver);
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });
    it("should return a driver", async () => {
        await request(app)
        .post('/driver/become')
        .send({
            userId: "1111",
            carId: "111",
            identityId: "1111",
            driversLicense: "1111",
            insurance: "1111",
            kbis: "1111",
            carRegistrationDocument: "1111",
        })
        .expect(201)
        .expect(response => {
            console.log("BECOME A DRIVER ===>", response.body)
        })
    })
    it("Should create car and save is id in driver", async () => {
        await request(app)
        .post('/driver/createCar')
        .send({
            picture: "3333",
            registration: "3333",
            model: "333",
            seats: 10,
            driverId: driverId 
        })
        .expect(200)
        .expect(response => {
            console.log("CREATE CAR ===>", response.body);
        })
    })
})