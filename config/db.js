const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://'+ process.env.DB_USER_PASS + '@bricepc.rt0ag.mongodb.net/mysoccerdb',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.log("Failed to connect to mongoDB", err))