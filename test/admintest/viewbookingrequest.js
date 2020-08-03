const request = require("supertest");
const expect = require("chai").expect;
const searchdetails = require("../models/ViewBooking.model");
const app = require("../server");
const Mongoose = require("mongoose");