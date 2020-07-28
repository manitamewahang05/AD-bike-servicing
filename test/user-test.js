const request = require("supertest");
const expect = require("chai").expect;
const aap = require("../server");
const users = require("../models/UserDetails.model");
const app = require("../server");

describe("USER REGESTRATOIN : POST/", () => {
    describe("USER CREDENTIALS", () => {

        it("When Username is empty it should return status:400", async() => {
            const user = new users({
                username: "",
                password: "12345jklm",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);

        });
        it("When Username is Repeadted it should return status:400 with error message", async() => {
            const user = new users({
                username: "user1",
                password: "",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });

            await user.save();
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.lengthOf.greaterThan(0);

        });


        it("When Password is empty it should return status:400", async() => {
            const user = new users({
                username: "user1",
                password: "",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);

        });
        it("When Name is empty it should return status:400", async() => {
            const user = new users({
                username: "user1",
                password: "12345jklm",
                name: "",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);

        });
        it("When Email is empty it should return status:400", async() => {
            const user = new users({
                username: "user1",
                password: "12345jklm",
                name: "user1name",
                email: "",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);

        });
        it("When Email Repeadted it should return status:400 with error message", async() => {
            const user = new users({
                username: "user1",
                password: "",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });

            await user.save();
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.lengthOf.greaterThan(0);

        });
        it("When Phone no is empty it should return status:400", async() => {
            const user = new users({
                username: "user1",
                password: "",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });
            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);


        });
        it("When Phone no is Repeadted it should return status:400 with error message", async() => {
            const user = new users({
                username: "user1",
                password: "",
                name: "user1name",
                email: "userEmail@gmail.com",
                phone: "123456789",
                avatar: "pic.jpg",
                location: "userLocation",
                role: 1,
                assignedServiceCenter: 1

            });

            await user.save();

            const res = await request(app).post("/register/").send(user);
            expect(res.status).to.equal(400);
            expect(res.body.error[0].msg).to.equal("The phone number already exists");

        });

        describe("SAVE USER TO DATABASE", () => {
            it("When user is saved to database it should return user object with valid mongo id ", async() => {
                const user = {
                    username: "pabinasda",
                    password: "12345jklm",
                    name: "user1name",
                    email: "userEmail@gmail.com",
                    phone: "123456789",
                    avatar: "pic.jpg",
                    location: "userLocation",
                    role: 1,
                    assignedServiceCenter: 1

                };

                const res = await request(app).post("/register/").send(user);
                expect(res.body).to.be.an("object");
                expect(Mongoose.Types.ObjectId.isValid(res.body._id)).to.equal(true);


            });

        });






    });


});