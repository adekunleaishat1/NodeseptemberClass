const mongoose = require("mongoose")


const userschma = mongoose.Schema({
    firstname:{type:String,trim:true,required:true },
    lastname:{type:String,trim:true,required:true},
    email:{type:String, unique:true, trim:true,required:true},
    password:{type:String, trim:true, required:true}
})


const usermodel = mongoose.model("user_collection", userschma)

module.exports = usermodel