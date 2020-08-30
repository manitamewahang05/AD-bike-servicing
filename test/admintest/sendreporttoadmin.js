const request = require("supertest");
const expect = require("chai").expect;
const feedbacks = require("../../models/Report.model");
const app = require("../../server");
const Mongoose = require("mongoose");
const { reporters } = require("mocha");

describe("SEND  USERREPORT  TO SUPERADMIN  : POST/", () => {
    describe("SEND REPORT", () => {
        beforeEach(function(done) {
            this.timeout(9000);
            feedbacks.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();

            })
        });

        it("When  message  is empty it should return :400 ", async() => {
            const report =new feedbacks( {
                Name:" harry",
                Email:"harry@gmail.com",
               Message:" This was a good serice",

           
        });


            // await user.save();

            const res = await request(app).post("/sendfeedbacks/").send(report)
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("Please write some message");

        });
        it("When  name  is empty it should return :400 ", async() => {
            const report = {
                Name:"",
                Email:"",
               Message:"",

            };


            // await user.save();

            const res = await request(app).post("/sendfeedbacks/").send(report)
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("Please enter your  name");

        });

        it("When   mail  is empty it should return :400 ", async() => {
            const report = {
                Name:"",
                Email:"",
               Message:"",

            };


            // await user.save();

            const res = await request(app).post("/sendfeedbacks/").send(report)
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("Please  enter your mail");

        });



    });
});