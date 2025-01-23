const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const user_api = require('./API/UserAPI');
const task_api = require('./API/TaskAPI')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors(
  {
    origin: "http://localhost:3000"
  }
));

mongoose.connect('mongodb://localhost:27017/TaskMangement')
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log(error);
  })

app.use('/user', user_api)
app.use('/task', task_api)

app.listen(4200, () => {
  console.log('Created');
})
