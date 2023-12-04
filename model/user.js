const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name:{
    type:String,
    required:[true , 'Email Required !!'],
    unique:true
  },
  password:{
    type:String,
    required:[true , 'Password Required !!']
  },
  userid:{
    type:String,
    required:[true , 'User Id Required !!']
  },
  status:{
    type:String,
    required:[true , 'Status Required !!']
  },
  type:{
    type:String,
    required:[true , 'Type Required !!']
  },
  token: {
    type: String,
  },
  date: {
    type: Date,
		default: Date.now
  }
}) 

const User = mongoose.model('user',UserSchema)
module.exports = User;
