const express = require('express');
const errors = require('../middleware/errors');
const router = express.Router();
const { Doctor, validate } = require('../model/doctor')

router.get('/getAllDoctors', async(req, res) => {
    const doctors = await Doctor.find();
    res.send(doctors);
})

router.get('/getOneDoctor/:id', async(req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if(!doctor) return res.status(404).send('this is doctor not find');
    res.send(doctor);
})


router.post('/addDoctor', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if (error) {
        return res.send({
          status: false,
          message: error.details[0].message,
        });
    }
    /* end validation by joi library */

    const newDoctor = await new Doctor({
        name: req.body.name,
        paragraph: req.body.paragraph,
        age: req.body.age,
        image: req.body.image
    });

    await newDoctor.save((err, doctor) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            }); 
        }
        return res.send({
            status: true,
            message: 'Doctor Saved',
            doctor
        });
    })
})

router.put('/editeDoctor/:id', async(req, res) => {
    /* start validation by joi library */
    const { error } = validate(req.body);
    if(error) {
        return res.send({
          status: false,
          message: error.details[0].message  
        })
    }
    /* end validation by joi library */

    const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            paragraph: req.body.paragraph,
            age: req.body.age,
            image: req.body.image
        }, { new: true}
    );

    if(!doctor) return res.status(404).send('this is doctor not find');

    await doctor.save((err, doctor) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            });
        }
        return res.send({
            status: true,
            message: 'Doctor Saved',
            doctor
        });
    });
})


router.delete("/deleteDoctor/:id", async(req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
    if(!doctor) return res.status(404).send('this is doctor not find');
    res.send({
        suceess: true,
        message: "this is removed",
    });
})


module.exports = router;