const request = require("supertest");
const expect = require("chai").expect;
//const aap = require("../../server");
const booking = require("../../models/Booking.model");
const users = require("../../models/UserDetails.model");
const bike = require("../../models/BikeDetails.model");
const bikeModel = require("../../models/Bike.model");
const serviceCenter = require("../../models/ServiceCenter.model");
const app = require("../../server");
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { json } = require("express");

describe("VIEW BOOKING REQUEST  : POST/", () => {
    beforeEach(function (done) {
        // this.timeout(9000);
        users.deleteMany({}, () => {
            serviceCenter.deleteMany({}, () => {
                bikeModel.deleteMany({}, () => {
                    bike.deleteMany({}, () => {
                        booking.deleteMany({}, () => {
                            done();
                        })
                    })

                })

            })



        })


    });
    it("VIEW BOOKING", async () => {
        //ADMIN DETAIL
        const adminUser = new users({
            username: "adminUser1",
            password: "12312311asd",
            name: "adminUser1",
            email: "admin@gmail.com",
            phone: "123123123",
            avatar: "pic.jpg",
            location: "pokhara",
            role: 2,
            assignedServiceCenter: 0
        });
        var adminUserRes = await adminUser.save();
        //SAVE bike Model Detail
        const bikeModels = new bikeModel({
            bikeModel: "vespa123",
            totalUsers: "13"
        });
        const bikemodelresult = await bikeModels.save();



        //Create and save service center
        const serviceCenters = new serviceCenter({
            admin: adminUserRes._id,
            name: "My service center",
            serviceLocation: "kathmandu",
            bookingLimit: 20,
            bookingCount: 0,
            contact: 123123123
        });
        const serciveCenterResult = await serviceCenters.save();


        //Normal User DETAIL
        const normalUser = new users({
            username: "normalUser",
            password: "normalUser123",
            name: "normalUser1",
            email: "normalUser@gmail.com",
            phone: "131231243",
            avatar: "pic.jpg",
            location: "KATHMANDU",
            role: 3,
            assignedServiceCenter: 1
        });
        //save normal user
        var normalUserResult = await normalUser.save();
        //Create and save bike detail
        var bikes = new bike({
            user: normalUserResult._id,
            bikeModel: bikemodelresult._id,
            bikeNumber: 1234,
            odometer: 1500
        })
        const bikeResult = await bikes.save();
        //create normaluser token
        const payload = {
            user: {
                id: normalUserResult.id,
                role: normalUserResult.role
            }
        };
        var token = jwt.sign(
            payload,
            config.get("jwtSecret"), { expiresIn: 36000 }
        );
        //create admin User token
        const payloadAdmin = {
            user: {
                id: adminUserRes.id,
                role: adminUserRes.role
            }
        };
        var tokenAdmin = jwt.sign(
            payloadAdmin,
            config.get("jwtSecret"), { expiresIn: 36000 }
        );


        //REQUEST BOOKING
        //booking detail
        const bookings = {
            bikeDetails: bikeResult._id,
            serviceCenter: serciveCenterResult._id,
            bookingStatus: 1
        }
        const reqBookingResult = await request(app).post("/booking/request").send(bookings).set('x-auth-token', token);
        //GET ALL booking request
        //current admin detail
        currentAdmin = {
            user: {
                id: adminUserRes._id
            }
        }
        const queueResult = await request(app).get("/booking/queue").send(currentAdmin).set('x-auth-token', tokenAdmin);
      
     expect(queueResult.body).to.be.an("array");
     expect(queueResult.status).to.equals(200)
     if(queueResult.body.length>=1)
       expect(JSON.stringify(queueResult.body[0].bike.user._id)).to.equal(JSON.stringify(normalUserResult._id))
       expect(queueResult.status).to.equals(200)
 

    });


});