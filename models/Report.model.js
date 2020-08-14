const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReportModelSchema = new Schema({

    Name:{
    type:String,
    required:true,

    },
    Email:{type:String,
    required:true,
},

   Message: {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
})
module.exports = report = mongoose.model("Feedback", ReportModelSchema);

