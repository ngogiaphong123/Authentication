//? Requires
require('dotenv').config({path : "./config.env"});
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/error');
//? Connect db
const connectDb = require('./config/db');
connectDb();
//? Routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/private'));
//? Error handler
app.use(errorHandler);
//? Server starting up
const PORT = process.env.PORT || 8080;
const sever = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`);
    //? Close server & exit process
    sever.close(() => {
        process.exit(1);
    })
})