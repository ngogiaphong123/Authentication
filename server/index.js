//? Requires
require('dotenv').config({path : "./config.env"});
const express = require('express');
const cors = require('cors');
const app = express();
//? Routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
//? Server starting up
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})