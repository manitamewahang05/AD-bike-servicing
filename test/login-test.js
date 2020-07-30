const request = require("supertest");
const expect = require("chai").expect;
const aap = require("../server");
const users = require("../models/UserDetails.model");
const app = require("../server");
const Mongoose = require("mongoose");
const UserDetailsModel = require("../models/UserDetails.model");


describe("USER LOGIN : POST/", () => {
    describe("USER CREDENTIALS", () => {
        after(function(done) {
            this.timeout(9000);
            users.deleteMany({}, (err) => {
              if (err) return done(err);
                
                done();

            })
        });

        it("When username is empty it should return status:400", async() => {
            const user = {
                username: "",
                password: "12345",

            };
            const res = await request(app).post("/Login/").send(user);
            expect(res.status).to.equal(400);

        })
    });
})


it("When password is empty it should return status:400", async() => {
    const user = {
        username: "user123",
        password: "",

    };
    const res = await request(app).post("/Login/").send(user);
    expect(res.status).to.equal(400);

})








describe("/POST user", () => {
    it(" when password and username is  entered  correctly:200", async() => {
      const user = {
        username: "",
        password: "",
      };
      const res=await request(app).get("/Login/").send(user);
      expect(res.status).to.equal(200);
    })

});

    
    
 
          
     