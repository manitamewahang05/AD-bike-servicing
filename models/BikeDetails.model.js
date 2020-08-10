const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BikeDetailsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: false,
    },
    bikeModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BikeModel',
        unique: true,
    },
    bikeNumber: {
        type: String,
        unique: true,
    },
    odometer: {
        type: Number,
        required:true,
    },
    

}, {
    timestamps: true
})

module.exports = Bike = mongoose.model('BikeDetails', BikeDetailsSchema)
