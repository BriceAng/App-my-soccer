const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        leadId: {
            type: String,
            required: true,
        },
        name : {
            type: String,
            unique: true,
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
            required: true,
            unique: true
        },
        //List of match requests (other team)
        requestGame: {
            type: [String],
            required: true,
            unique: true,
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
                    validateGame: {
                        type: Boolean,
                        default: false
                    },
                    timestamps: Number
                }
            ]
        },
        won: {
            type: Number,
            default: 0,
        },
        
        drawn: {
            type: Number,
            default: 0,
        },
        
        lost: {
            type: Number,
            default: 0,
        },
        points: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('team', TeamSchema);