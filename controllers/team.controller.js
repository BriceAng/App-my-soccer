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

// Add user to wait list team
module.exports.requestUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { requestUser: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { waitList: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        res.status(400).send(err);
    }
};

//remove user to wait list team
module.exports.cancelRequestUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { requestUser: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { waitList: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        res.status(400).send(err);
    }
};

//show wait list User
module.exports.showWaitListUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    TeamModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs.requestUser);
        else console.log('ID unknow : ' + err);
    })
};

//accept user in wait list to userList
module.exports.acceptUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { requestUser: req.body.id },
                $addToSet: { userList: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { waitList: req.params.id },
                $addToSet: {team: req.params.id}
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );

    } catch (err) {
        res.status(400).send(err);
    }
};

//Add team to wait list Game
module.exports.requestGame = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { requestGame: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await TeamModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { pendingRequestGame: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        res.status(400).send(err);
    }
};

//remove team into wait list Game
module.exports.cancelRequestGame = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { requestGame: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await TeamModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { pendingRequestGame: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        res.status(400).send(err);
    }
};

//show wait list Game
module.exports.showWaitListGame = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    TeamModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs.requestGame);
        else console.log('ID unknow : ' + err);
    })
};

//accept game
module.exports.acceptGame = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToRequest))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {
                    games: {
                        opponentId: req.body.idToRequest,
                        timestamps: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await TeamModel.findByIdAndUpdate(
            req.body.idToRequest,
            {
                $addToSet: {
                    games: {
                        opponentId: req.params.id,
                        timestamps: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await TeamModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { requestGame: req.body.idToRequest }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await TeamModel.findByIdAndUpdate(
            req.body.idToRequest,
            {
                $pull: { pendingRequestGame: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.Result = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findById(req.params.id, (err, docs) => {
            const theGame = docs.games.find((game) =>
                game._id.equals(req.body.gameId)
            );

            if (!theGame) return res.status(404).send("Game not found");
            theGame.goalFor = req.body.goalFor;
            theGame.goalAgainst = req.body.goalAgainst;

            docs.save();
        });
        await TeamModel.findById(req.body.teamId, (err, docs) => {
            const theGame = docs.games.find((game) =>
                game._id.equals(req.body.gameId2)
            );

            if (!theGame) return res.status(404).send("Game not found");
            theGame.goalFor = req.body.goalAgainst;
            theGame.goalAgainst = req.body.goalFor;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        if (err) return res.status(400).send(err);
    }
};

module.exports.validResult = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(' ID unknow : ' + req.params.id)

    try {
        await TeamModel.findById(req.params.id, (err, docs) => {
            const team = docs;
            const theGame = docs.games.find((game) =>
                game._id.equals(req.body.gameId)
            );

            if (!theGame) return res.status(404).send("Game not found");
            theGame.validateGame = true;

            if (theGame.goalFor > theGame.goalAgainst) {
                team.won += 1;
                team.points += 3;
            } else if (theGame.goalFor < theGame.goalAgainst) {
                team.lost += 1
            } else {
                team.drawn += 1;
                team.points += 1
            }

            docs.save();
        });
        await TeamModel.findById(req.body.teamId, (err, docs) => {
            const team = docs;
            const theGame = docs.games.find((game) =>
                game._id.equals(req.body.gameId2)
            );

            if (!theGame) return res.status(404).send("Game not found");
            theGame.validateGame = true;

            if (theGame.goalFor > theGame.goalAgainst) {
                team.won += 1;
                team.points += 3;
            } else if (theGame.goalFor < theGame.goalAgainst) {
                team.lost += 1
            } else {
                team.drawn += 1;
                team.points += 1
            }

            console.log(docs);

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
        //--------------------voir pour ajouter avec un if dans victoire defaite ou match nul-------------
        await TeamModel.findByIdAndUpdate(req.params.id, (err, docs) => {

        }

        )
    } catch (err) {
        if (err) return res.status(400).send(err);
    }
};
