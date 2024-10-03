const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
const usermodel = require("./model/Usermodel")

const shopmodel = require("./model/Shopmodel")
const userrouter = require("./Route/Userroute")
const todorouter = require("./Route/Todoroute")

///middle ware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use("/user",userrouter)
app.use("/todo",todorouter)

// CRUD CREATE READ UPDATE AND DELETE



let errormessage  = ""







app.get('/shop', async(req, res)=>{
   const shoplist = await shopmodel.find()
   console.log(shoplist);
   
  res.render("shop",{shoplist})
})

app.post("/register", async(req, res)=>{
  console.log(req.body);
  try {
   const createuser = await usermodel.create(req.body)
   if (createuser) {
      console.log("signup successful");
      res.redirect("/login")
      
   }else{
    console.log("error occured");
    res.redirect("/")
   }
  } catch (error) {
    console.log(error);
    res.redirect("/")
  }
  
})

app.post("/signin", async(req, res)=>{
  console.log(req.body);
  const {email , password} = req.body
  try {
   const existuser = await usermodel.findOne({email:email})
   console.log(existuser);
   if (existuser && existuser.password == password) {
    console.log("login successful");
    res.redirect("/todo")
   }else{
    console.log("invalid user");
    res.redirect("/login")
   }
    
  } catch (error) {
    console.log(error);
    res.redirect("/login")
    
  }
})









app.post("/addlist", async(req, res)=>{
try {
  console.log(req.body);
 const add =  await shopmodel.create(req.body)
  if (add) {
    console.log("list added");
    res.redirect("/shop")
  }else{
    console.log("an error occured");
    res.redirect("/shop")
  }
} catch (error) {
  console.log(error);
  res.redirect("/shop")
  
}
})

app.post('/update/:id', async(req, res)=>{
  try {
    console.log(req.body);
    const {id} = req.params
    const {completed} = req.body
   const shop =  await shopmodel.findOne({_id: id })
   console.log(shop, "shop completed");
   
   if (shop.completed == true) {
    await shopmodel.findByIdAndUpdate(
      {_id:id},
      {completed:false},
      {new:true}
    )   
    res.redirect('/shop') 
   }else{
    await shopmodel.findByIdAndUpdate(
      {_id:id},
      {completed:completed},
      {new:true}
    )    
    res.redirect('/shop') 
   }
  } catch (error) {
    console.log(error);
    
  }
})

const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/septembercohort?retryWrites=true&w=majority&appName=Cluster0"

const db_connect = async() =>{
  try {
    const connection = await mongoose.connect(uri)
    if (connection) {
      console.log("connected to database");
      
    }
    
  } catch (error) {
    console.log(error);
    
  }
}
db_connect()
const port = 8003

app.listen(port,()=>{
    console.log(`app started on port ${port}`);
    
})