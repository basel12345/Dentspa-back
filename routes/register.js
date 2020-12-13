const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, validateRegister} = require('../model/user');
const router = express.Router();

router.get('/getAllRegister', async(req, res) => {
    const users = await User.find();
    console.log(users)
    res.send(users);
});

router.get('/getAllAdmin', async(req, res) => {
    const users = await User.find({
      isRole: 1
    });
    res.send(users);
});

router.get('/getAllUsers', async(req, res) => {
  const users = await User.find({
    isRole: 0
  });
  res.send(users);
});

router.post('/registerUser', async(req, res) => {
    console.log(req.body);
    /* start validation by joi library */
    const { error } = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    /* end validation by joi library */

    /* Make sure it is correct email*/
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isRole: req.body.isRole
    });

      /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(user["password"], salt);
    user["confirmPassword"] = await bcrypt.hash(user["confirmPassword"], salt);

    /*-----------token----------*/
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    await user.save((err, user) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.header("x-auth-token", token).send({
        status: true,
        message: "user register",
        user,
        token,
      });
    });
})

module.exports = router;