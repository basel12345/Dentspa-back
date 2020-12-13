const express = require('express');
const router = express.Router();
const { Appointment, validate } = require("../model/appointment");

router.get('/getAppointment', async(req, res) => {
    const appointment = await Appointment.find();
    res.send(appointment);
})

router.get('/getAppointment/:id', async(req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).send("this appointment not found");
    res.send(appointment);
})

router.post('/addAppointment', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if (error) {
      return res.send({
        status: false,
        message: error.details[0].message,
      });
    }
    /* end validation by joi library */

    const newAppointment = await new Appointment({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        mobile: req.body.mobile,
        date: req.body.date,
    });

    await newAppointment.save((err, appointment) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            });
        }
        res.send({
          status: true,
          message: "Appointment saved",
          appointment,
        });
    });
})


router.put('/editAppointment/:id', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if (error) {
      return res.send({
        status: false,
        message: error.details[0].message,
      });
    }
    /* end validation by joi library */

    const appointment = await Appointment.findByIdAndUpdate(
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

    if (!appointment) return res.status(404).send("this appointment not found");
    await appointment.save((err, appointment) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.send({
        status: true,
        message: "Appointment Edited",
        appointment,
      });
    });
})

router.delete('/deleteAppointment/:id', async(req, res) => {
    const appointment = await Appointment.findByIdAndRemove(req.params.id);
    if (!appointment) return res.status(404).send("Not find this id");
    return res.send({
      suceess: true,
      message: "this is removed",
    });
})

module.exports = router;