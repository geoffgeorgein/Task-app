const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const toDoSchema = new Schema({
  name:String, 
  done:{
    type:Boolean,
    default:false
  }
  
});

const todoModel = model('todoModel', toDoSchema);

module.exports = todoModel;