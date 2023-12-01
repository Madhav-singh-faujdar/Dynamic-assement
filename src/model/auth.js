const mongoose = require('mongoose')
const Schema = mongoose.Schema


const authData = new Schema({

firstName:{
    type:String
},
email:{
    type:String,
    required:true,
    unique:[true,"Email already exits!"]
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    required:true,
    default:"student"
}


})

module.exports = mongoose.model('auth',authData)