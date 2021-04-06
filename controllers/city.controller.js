const CityModel = require('../models/city.model');
const ObjectID = require('mongoose').Types.ObjectId;

//show all cities
module.exports.getAllCities = async (req, res) => {
    const cities = await CityModel.find().select();
    res.status(200).json(cities);
};

//add new city
module.exports.addCity = async (req, res) => {
    const { department, zipCode, name } = req.body;

    try{
        const city = await CityModel.create({ department, zipCode, name });
        res.status(201).json({ city: city._id});
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.cityInfo = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id);

    CityModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknow : ' + err);
    })
}