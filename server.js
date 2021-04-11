const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const cityRoutes = require('./routes/city.routes');
const teamRoutes = require('./routes/team.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const app = express();


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.use('*', checkUser);
app.use('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/team', teamRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`listening on port : ${process.env.PORT}`);
})