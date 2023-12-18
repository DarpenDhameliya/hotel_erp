const mongoose = require('mongoose')
const { Schema } = mongoose

if (mongoose.models['odrcount']) {
  delete mongoose.models['odrcount'];
}

const CountSchema = new Schema({
  
  titles:{
    type:String,
  },
  id:{
    type:Number,
  }
}) 

const Countermodle = mongoose.model('odrcount',CountSchema)
module.exports = Countermodle;