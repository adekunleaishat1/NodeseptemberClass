const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")

///middle ware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

// CRUD CREATE READ UPDATE AND DELETE

const userschma = mongoose.Schema({
  firstname:{type:String,trim:true,required:true },
  lastname:{type:String,trim:true,required:true},
  email:{type:String, unique:true, trim:true,required:true},
  password:{type:String, trim:true, required:true}
})

const usermodel = mongoose.model("user_collection", userschma)

 const todoschema = mongoose.Schema({
   title:{type:String, trim:true, required:true},
   content:{type:String, trim:true, required:true}
  
 },{timestamps:true})

 const todomodel = mongoose.model("todo_collection", todoschema)

 const shopschema = mongoose.Schema({
  item:{type:String, trim:true,required:true},
  price:{type:Number, trim:true, required:true},
  quantity:{type:Number, trim:true, required:true},
  amount:{type:Number, trim:true, required:true},
  completed:{type:Boolean, default:false}
 },{timestamps:true})
 const shopmodel = mongoose.model("shopping_collection", shopschema)

let userarray = []
let todoarray = []
let errormessage  = ""

app.get("/", (req, res)=>{

  res.render("signup",{errormessage})
})

app.get('/login',(req, res)=>{
    res.render("login")
})

app.get("/todo", async(req, res)=>{
  const alltodo = await todomodel.find()
  console.log(alltodo);
   res.render("todo",{alltodo})
})

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

app.post("/addtodo", async(req, res)=>{
  console.log(req.body);
  try {
    const todo =  await todomodel.create(req.body)
 if (todo) {
  console.log("todo created successfully");
    res.redirect('/todo')
 }else{
  console.log("error occured");
  
 }
  } catch (error) {
    console.log(error);
    
  }
 

})

app.post("/deletetodo", async(req, res)=>{
  console.log(req.body);
try {
  const {id} = req.body
 const deleted =  await todomodel.findByIdAndDelete({_id:id})
 console.log(deleted);
res.redirect("/todo")

  
} catch (error) {
  console.log(error);
  res.redirect("/todo")
}
  
})

app.get("/edit/:id",async(req, res)=>{
  console.log(req.params.id);
  const {id} = req.params
  try {
   const getedit = await todomodel.findOne({_id:id})
   console.log(getedit);
   res.render("edit", {getedit})
  } catch (error) {
    console.log(error);
    res.redirect("/todo")
  }
  // const {index} = req.params
  // let onetodo = todoarray[index]
  // res.render("edit", {onetodo, index})
})

app.post("/edittodo/:id",async(req, res)=>{
  console.log(req.body);
  const {id} = req.params;
  const {title , content} = req.body
  try {
    const postedit = await todomodel.findOneAndUpdate(
      {_id:id},
      {title:title, content:content},
      {new:true}
    )
    console.log(postedit);
    res.redirect("/todo")
    
  } catch (error) {
    console.log(error);
    res.redirect("/edit/:id")
    
  }
  // const {index} = req.params
  // console.log(todoarray[index]);
  // todoarray[index] = req.body
  // res.redirect("/todo")
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
    await shopmodel.findByIdAndUpdate(
      {_id:id},
      {completed:completed},
      {new:true}
    )    
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