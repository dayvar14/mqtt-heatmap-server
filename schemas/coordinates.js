require('dotenv').config();

const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    lat: { type: Number, set: (v)=>{
        return Number.parseFloat(v).toFixed(process.env.COORDINATES_LAT_PRECISION)
    } },
    lng: { type: Number, set: (v)=>{
        return Number.parseFloat(v).toFixed(process.env.COORDINATES_LNG_PRECISION)
    } },
    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: process.env.COORDINATES_EXPIRE_TIME || '1m',
    }
});

CoordinateSchema.index({ username:1 }, { "unique": true });
module.exports = mongoose.model("Coordinates", CoordinateSchema);