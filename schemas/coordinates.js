require('dotenv').config();

const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },

    lat: { 
        type: Number, set: (v)=>{
            return Number.parseFloat(v).toFixed(process.env.COORDINATES_LAT_PRECISION)},
        min: process.env.MIN_COORDINATES_LAT,
        max: process.env.MAX_COORDINATES_LAT 
    },

    lng: { type: Number, set: (v)=>{
            return Number.parseFloat(v).toFixed(process.env.COORDINATES_LNG_PRECISION)},
        min: process.env.MIN_COORDINATES_LNG,
        max: process.env.MAX_COORDINATES_LNG  
    },

    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: process.env.COORDINATES_EXPIRE_TIME || '1m',
    }
});

CoordinateSchema.index({ id:1 }, { "unique": true });

module.exports = mongoose.model("Coordinates", CoordinateSchema);