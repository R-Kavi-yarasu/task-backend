const express = require('express');
const taskApp = express.Router();
const Task = require('../Schema/Task');

// Get
taskApp.get('/get',async function (req,res) {
  await Task.find()
  .then((task)=>{
    res.send(task).status(200);
  })
  .catch((error)=>{
    res.send(error).status(500);
  })
})

// Get with id
taskApp.get('/get/:id', async function (req, res) {
  await Task.findById(req.params.id)
    .then((task) => {
      res.send(task).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

// Post Method
taskApp.post('/post', async function (req, res) {
  const date = new Date();
  const  CreatedAtDate = `${date.toLocaleDateString("default",{day:"2-digit",month:"2-digit",year:"numeric"})}`

  await Task.create({
    Title: req.body.title,
    Description: req.body.description,
    AssignedUser: req.body.assignedto,
    TaskStatus: req.body.taskstatus,
    CreatedAt: CreatedAtDate
  })
    .then((task) => {
      res.send(task).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

// Update 
taskApp.put('/put/:id', async function (req, res) {
  await Task.findByIdAndUpdate(req.params.id, {
    Title: req.body.title,
    Description: req.body.description,
    AssignedUser: req.body.assignedto,
    TaskStatus: req.body.taskstatus,
  }, { new: true })
    .then((task) => {
      res.send(task).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

// Delete
taskApp.delete('/delete/:id', async function (req, res) {
  await Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Deleted").status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    })
})

// Update task status
// taskApp.put('/update-status/:id', async function (req, res) {
//   await Task.findById(req.params.id)
//     .then((task) => {
//       if (!task) {
//         return res.status(404).send('Task not found');
//       }

//       // Define allowed status transitions
//       const statusTransitions = {
//         todo: 'inprogress',
//         inprogress: 'done',
//         done: null, // No transition allowed from 'done'
//       };

//       const nextStatus = statusTransitions[task.TaskStatus];

//       if (!nextStatus) {
//         return res.status(400).send(Task is already in '${task.TaskStatus}' status and cannot be updated further.);
//       }

//       task.TaskStatus = nextStatus;
//       return task.save();
//     })
//     .then((updatedTask) => {
//       res.status(200).send({ message: 'Task status updated successfully', task: updatedTask });
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

module.exports = taskApp;