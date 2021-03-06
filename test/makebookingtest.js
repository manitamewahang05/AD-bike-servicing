const request = require("supertest");
const expect = require("chai").expect;
const aap = require("../server");
const booking = require("../models/Booking.model");
const users = require("../models/UserDetails.model");
const bike = require("../models/Bike.model");
const bikeModel = require("../models/Bike.model");
const serviceCenter = require("../models/ServiceCenter.model");
const app = require("../server");
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


describe("BOOKING", () => {
    beforeEach(function(done) {
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
    it("REQUEST BOOKING", async() => {

        //SUPERADMIN DETAIL
        const superAdmin = new users({
            username: "superadmin1",
            password: "asdasd123",
            name: "superadminUser1",
            email: "superdmin@gmail.com",
            phone: "12345678",
            avatar: "pic.jpg",
            location: "userLocation",
            role: 1,
            assignedServiceCenter: 0
        });
        var superAdminRes = await superAdmin.save();
        // console.log(superAdmin)
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
        //  console.log(adminUserRes)
        //boke model detail
        const bikeModels = new bikeModel({
            bikeModel: "vespa123",
            totalUsers: "13"
        });
        const bikemodelresult = await bikeModels.save();
        // console.log(bikemodelresult);
        //bike detail
        var bikes = new bike({
            user: adminUser._id,
            bikeModel: bikemodelresult._id,
            bikeNumber: 1234,
            odometer: 1500
        })
        const bikeResult = await bikes.save();
        // console.log(bikeResult);


        //service center detail
        const serviceCenters = new serviceCenter({
            admin: adminUser._id,
            name: "My service center",
            serviceLocation: "kathmandu",
            bookingLimit: 20,
            bookingCount: 0,
            contact: 123123123
        });

        const serciveCenterResult = await serviceCenters.save();
        //  console.log(serciveCenterResult);

        //USEr DETAIL
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
        // const normalUserResult = await normalUser.save();
        //console.log(normalUserResult);
        // const normalUserLoginResult = await request(app).post("/register/").send(normalUser);
        //   console.log((await normalUserLoginResult).body);
        //create user token
        var normalUserResult = await normalUser.save();
        //create token
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



        //booking detail
        const bookings = {
            bikeDetails: bikeResult._id,
            serviceCenter: serciveCenterResult._id
                // bookingDate: Date.now(),
                // servicingDate: Date.now(),
                // lastServicingDate: Date.now(),
                // bookingStatus: 0,
                // totalPrice: 123

        }
        const reqBookingResult = await request(app).post("/booking/request").send(bookings).set('x-auth-token', token);
        expect(reqBookingResult.body).to.be.an("object");
        expect(reqBookingResult.status).to.equal(200);

    });

   //user cancel booking
   it("delete the  booking by user ", async() => {
            
    id=1
    const res = await request(app).delete("/cancelbookingrequest/users"+id);

    expect(res.body).to.be.an("object");
    expect(res.status).to.equal(200);



});



    });








