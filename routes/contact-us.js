const express = require('express');
const router = express.Router();
const { Contact, validate } = require("../model/contact-us");

router.get('/getContact', async(req, res) => {
    const contact = await Contact.find();
    res.send(contact);
})

router.get('/getContact/:id', async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("this contact not found");
    res.send(contact);
})

router.post('/addContact', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if (error) {
      return res.send({
        status: false,
        message: error.details[0].message,
      });
    }
    /* end validation by joi library */

    const newContact = await new Contact({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        date: req.body.date,
    });

    await newContact.save((err, contact) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            });
        }
        res.send({
          status: true,
          message: "Contact saved",
          contact,
        });
    });
})


router.put('/editContact/:id', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if (error) {
      return res.send({
        status: false,
        message: error.details[0].message,
      });
    }
    /* end validation by joi library */

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            date: req.body.date,  
        },
        { new: true }
    );

    if (!contact) return res.status(404).send("this contact not found");
    await contact.save((err, contact) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.send({
        status: true,
        message: "Contact Edited",
        contact,
      });
    });
})

router.delete('/deleteConnect/:id', async(req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact) return res.status(404).send("Not find this id");
    return res.send({
      suceess: true,
      message: "this is removed",
    });
})

module.exports = router;