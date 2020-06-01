const {Schema, model} = require("mongoose");

const employee = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birth: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  vacancy: {
    type: String,
    required: true
  },
  remote: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  home: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

module.exports = model('Employee', employee)