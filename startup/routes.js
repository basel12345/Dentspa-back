const express = require('express');
const error = require("../middleware/errors");
const cors = require('cors');
const path = require("path");
const contact = require('../routes/contact-us');
const appointment = require('../routes/appointment');
const register = require('../routes/register');
const auth = require('../routes/auth');
const doctor = require('../routes/doctor');

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static(path.join(__dirname, "uploads")));
    app.use('/contact', contact);
    app.use('/appointment', appointment);
    app.use('/register', register);
    app.use('/auth', auth);
    app.use('/doctor', doctor);
    app.use(error);
};