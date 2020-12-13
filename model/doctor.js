const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    paragraph: {
        type: String,
        trim: true,
        required: true   
    },
    age: {
        type: Number,
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

function validateDoctor(doctor) {
    const schema = {
      name: Joi.string().trim().min(3).required(),
      paragraph: Joi.string().trim().email().required(),
      age: Joi.string().trim().min(3).required(),
      image: Joi.string().trim().min(3).required()
    };
    return Joi.validate(doctor, schema);
  };

const Doctor = mongoose.model('Doctor', DoctorSchema);

exports.Doctor = Doctor;
exports.validate = validateDoctor;
