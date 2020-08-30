const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../server");
const config = require("config");
const Mongoose = require("mongoose");
const report = require("../../models/Report.model");
const jwt = require("jsonwebtoken");

describe("VIEW  ADMIN REPORT : GET/", () => {
    describe("RETRIEVE  ADMIN  REPORT ", () => {
        beforeEach(function(done) {
            this.timeout(9000);
          report.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();
           
            })
        });
                it("FETCH  ADMIN REPORTS FROM DATABASE", async() => {
                    const reportmodel = new  report({
                        Name:"gg",
                        Email:"hh@gmail.com",
                       Message:"asass",       
                    });
                    var user = await reportmodel.save();
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
                    var res = await request(app).get("/report/viewfeedback", reportmodel).set('x-auth-token', token);
                    //   console.log(res.body);
                    expect(res.status).equal(200);
                    expect(res.body).to.be.an("object");
        
                });
        


            })
        });
    