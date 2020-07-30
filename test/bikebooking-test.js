const request = require("supertest");
const expect = require("chai").expect;
const bikedetails = require("../models/BikeDetails.model");
const app = require("../server");
const Mongoose = require("mongoose");
const BikeDetailsModel = require("../models/BikeDetails.model");


describe("BIKE BOOKING : POST/", () => {
    describe("ADD BIKE DETAILS", () => {
        beforeEach(function(done) {
            this.timeout(9000);
            bikedetails.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();

            })
        });

    
        it("When bikemodel is empty it should return :400 ", async() => {
            const bikedetails = {
                bikemodel: "",
                bikenumber:"123",
                odometer: "12",
                bikestatus: "good",
        
                role: 1,
                assignedServiceCenter: 1

            };

            // await user.save();

            const res = await request(app).post("/bikedetails/").send(bikedetails);
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("Please select your bike model");

        });


        it("When odometer is empty it should return :400 ", async() => {
            const bikedetails = {
                bikemodel: "",
                bikenumber:"123",
                odometer: "12",
                bikestatus: "good",
        
                role: 1,
                assignedServiceCenter: 1

            };

            // await user.save();

            const res = await request(app).post("/bikedetails/").send(bikedetails);
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("Please enter your odometer");

        });
    });

    it("When bikestatus is empty it should return :400 ", async() => {
        const bikedetails = {
            bikemodel: "",
            bikenumber:"123",
            odometer: "12",
            bikestatus: "good",
    
            role: 1,
            assignedServiceCenter: 1

        };

        // await user.save();

        const res = await request(app).post("/bikedetails/").send(bikedetails);
        expect(res.status).to.equal(400);
        expect(res.body.error[0].msg).to.equal("Please enter your bikestaus");

    });

    it("When bikenumber is empty it should return :400 ", async() => {
        const bikedetails= {
            bikemodel: "",
            bikenumber:"123",
            odometer: "12",
            bikestatus: "good",
    
            role: 1,
            assignedServiceCenter: 1

        };

        // await user.save();

        const res = await request(app).post("/bikedetails/").send(bikedetails);
        expect(res.status).to.equal(400);
        expect(res.body.error[0].msg).to.equal("Please enter your bikenumber");

    });

    it("When bikenumber is Repeadted it should return status:400 with error message", async() => {
        const user = {
            bikemodel: "",
            bikenumber:"123",
            odometer: "12",
            bikestatus: "good",
    
            role: 1,
            assignedServiceCenter: 1

        };

        // await user.save();

        const res = await request(app).post("/bikedetails/").send(user);
        expect(res.status).to.equal(400);
        expect(res.body.error[0].msg).to.equal("This bike number aleready exists");

    });
});


    describe("SAVE USER TO DATABASE", () => {
        beforeEach(function(done) {
            this.timeout(9000);
            bikedetails.deleteMany({}, (err) => {
               if (err) return done(err);
               
                done();

            })
        });
        it("When bikedetails is saved to database it should return user object with valid mongo id ", async() => {
            const bikedetails = {
                bikemodel: "pabinasda",
                odometer: "12345jklm",
                bikenumber: "user1name",
                bikestatus: "userEmail@gmail.com",
               
                role: 1,
                assignedServiceCenter: 1

            };

            const res = await request(app).post("/bikedetails/").send(bikedetails);
            expect(res.body).to.be.an("object");
            expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);


        });

    });






