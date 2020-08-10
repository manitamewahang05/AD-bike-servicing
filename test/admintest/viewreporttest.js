const request = require("supertest");
const expect = require("chai").expect;
const userfeedbacks = require("../../models/Report.model");
const app = require("../../server");
const config = require("config");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

describe("VIEW USER REPORT : GET/", () => {
    describe("RETRIEVE USER REPORT ", () => {
        beforeEach(function(done) {
            this.timeout(9000);
           userfeedbacks.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();
           
            })
        });
                it("FETCH  USER REPORTS FROM DATABASE", async() => {
                    const report = new  userfeedbacks({
                        Name:"gg",
                        Email:"hh@gmail.com",
                       Message:"asass",       
                    });
                    var user = await report.save();
                    //create token
                    const payload = {
                        user: {
                            id: user.id,
                            role: user.role
                        }
                    };
                    var token = jwt.sign(
                        payload,
                        config.get("jwtSecret"), { expiresIn: 36000 }
                    );
                    // console.log(token);
                    var res = await request(app).get("/report/viewreport", report).set('x-auth-token', token);
                    //   console.log(res.body);
                    expect(res.status).equal(200);
                    expect(res.body).to.be.an("object");
        
                });
        


            })
        });

 