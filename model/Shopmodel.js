const mongoose = require("mongoose")


const shopschema = mongoose.Schema({
    item:{type:String, trim:true,required:true},
    price:{type:Number, trim:true, required:true},
    quantity:{type:Number, trim:true, required:true},
    amount:{type:Number, trim:true, required:true},
    completed:{type:Boolean, default:false}
},{timestamps:true})
   
const shopmodel = mongoose.model("shopping_collection", shopschema)


module.exports = shopmodel