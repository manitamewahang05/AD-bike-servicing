const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceCenterSchema = new Schema(
    {
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      serviceLocation: {
        type: String,
        required: true
      },
     
      bookingLimit: {
        type: Number,
        required: true
      },
     
      contact: Number
    },
    {
      timestamps: true
    }
  );
  
  module.exports = ServiceCenter = mongoose.model(
    "ServiceCenter",
    serviceCenterSchema
  );