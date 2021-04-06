const mongoose = require('mongoose');


const CitySchema = new mongoose.Schema(
    {
        department: {
            type: String,
            require: true,
        },

        zipCode:{
            type: String,
            require: true,
        },

        name: {
            type: String,
            require: true,
        },
    }
);

module.exports = mongoose.model('city', CitySchema);