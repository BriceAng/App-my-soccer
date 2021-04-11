const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        leadId: {
            type: String,
            required: true,
        },
        name : {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        },
        cityId: {
            type: String,
            required: true
        },
        picture: {
            type: String,
        },
        bio: {
            type: String,
        },
        userList: {
            type: [String],
            required: true
        },
        requestUser: {
            type: [String],
            required: true
        },
        requestGame: {
            type: [String],
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('team', TeamSchema);