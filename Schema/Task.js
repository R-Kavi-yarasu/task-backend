const mongoose = require('mongoose');

const task = mongoose.Schema({
  
  Title:{
    type:String,
    required:true
  },
  Description:{
    type:String,
    required:true
  },
  AssignedUser:{
    type:String,
    required:true
  },
  TaskStatus:{
    type:String,
    enum: ['todo', 'inprogress', 'done'], 
    default: 'todo',
  },
  CreatedAt:{ 
    type:String,
    required:true
  }
})

module.exports = mongoose.model('task_data',task)