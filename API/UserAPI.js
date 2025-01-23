const express = require('express');
const userApp = express.Router();
const User = require('../Schema/User');

userApp.get('/get', async function (req, res) {
  await User.find()
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})
userApp.get('/get/:id', async function (req, res) {
  await User.findById(req.params.id)
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})


userApp.post('/post', async function (req, res) {
  const userCount = await User.countDocuments()  
  const newUserId = `TMS${(userCount+1).toString().padStart(2,'0')}`
  await User.create({
    UserId:newUserId,
    Name: req.body.username,
    Email: req.body.email,
    Role: req.body.role
  })
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

userApp.put('/put/:id', async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    Name: req.body.username,
    Email: req.body.email,
    Role: req.body.role
  }, { new: true })
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

userApp.delete('/delete/:id', async function (req, res) {
  await User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Deleted").status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

module.exports = userApp;