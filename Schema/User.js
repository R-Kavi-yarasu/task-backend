const mongoose = require('mongoose');

const user = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Role: {
    type: String,
    required: true
  },
  UserId:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('user_data',user)