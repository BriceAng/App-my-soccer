const TeamModel = require('../models/team.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.showTeams = (req, res) => {
    TeamModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get date : ' + err);
    })
};

module.exports.createTeam = async (req, res) => {
    const newTeam = new TeamModel({
        leadId: req.body.leadId,
        name: req.body.name,
        cityId: req.body.cityId,
        userList: [],
        requestUser: [],
        requestGame: [],
    });
    try {
        const team = await newTeam.save();
        return res.status(201).json(team);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updateTeam = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    const updateRecord = {
        bio: req.body.bio
    }

    TeamModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
};

module.exports.deleteTeam = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    TeamModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )
};
