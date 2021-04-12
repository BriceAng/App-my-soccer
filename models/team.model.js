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
        //List of team players
        userList: {
            type: [String],
            required: true
        },
        //List of pending player requests
        requestUser: {
            type: [String],
            required: true
        },
        //List of match requests (other team)
        requestGame: {
            type: [String],
            required: true
        },
        //List of pending match requests (your team)
        pendingRequestGame: {
            type: [String],
            required: true
        },
        games: {
            type: [
                {
                    opponentId: String,
                    goalFor: Number,
                    goalAgainst: Number,
                    timestamps: Number
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('team', TeamSchema);