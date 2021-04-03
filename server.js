const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));



//routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`listening on port : ${process.env.PORT}`);
})