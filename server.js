const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

// Connection string
const uri = require("./config/keys").ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Connection to mongodb
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB succesfully connected");
});

//Require and Use routes created
const userRegisterRoute = require("./routes/userRoutes/userRegister");
const login = require("./routes/userRoutes/LoginAndAuth");



app.use("/register", userRegisterRoute);
app.use("/auth", login);





// listen to port
app.listen(port, () => {
    console.log(`Server is started on port:  ${port}`);
});

module.exports = app;