const Joi = require('@hapi/joi');
const mongoosse = require('mongoose');
const Schema = mongoosse.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8
    },
    isRole: {
        type: Number,
    }
});

// validation for login
function validateLogin(login) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    };
    return Joi.validate(login, schema);
  }
  
// validation for register
function validateRegister(register) {
    const schema = {
      name: Joi.string().trim().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
      confirmPassword:  Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
      isRole: Joi.number().required(),
    };
    return Joi.validate(register, schema);
  };

const User = mongoosse.model('User', UserSchema);

exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
