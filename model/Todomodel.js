const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
    title:{type:String, trim:true, required:true},
    content:{type:String, trim:true, required:true}
   
},{timestamps:true})
 

const todomodel = mongoose.model("todo_collection", todoschema)


module.exports = todomodel