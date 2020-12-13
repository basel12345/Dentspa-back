const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 3, 
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 3, 
        trim: true
    },
    date: {
        type: Date,
        required: true
    }
});

function validateContact(contact) {
    const schema = {
      name: Joi.string().trim().min(3).required(),
      email: Joi.string().trim().email().required(),
      mobile: Joi.string().trim().min(3).required(),
      address: Joi.string().trim().min(3).required(),
      date: Joi.date().required(),
    };
    return Joi.validate(contact, schema);
  };

  const Contact = mongoose.model("Contact", ContactSchema);
  exports.Contact = Contact;
  exports.validate = validateContact;
