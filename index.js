const express = require('express')
const app = express()
const ejs = require('ejs')

///middle ware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

let userarray = []
let todoarray = []
let errormessage  = ""

app.get("/", (req, res)=>{

  res.render("signup",{errormessage})
})

app.get('/login',(req, res)=>{
    res.render("login")
})

app.get("/todo",(req, res)=>{
   res.render("todo",{todoarray})
})

app.post("/register",(req, res)=>{
  console.log(req.body);
  let body = req.body
  let existuser =  userarray.find((user)=> user.email === req.body.email)
  if (existuser) {
     errormessage = "user already exist"
     res.redirect("/")
  }else{
     errormessage = ""
    userarray.push(body)
    console.log(userarray);
    res.redirect("/login")
  }
  
})

app.post("/signin",(req, res)=>{
  console.log(req.body);
 const existuser = userarray.find((user)=>user.email == req.body.email)
 console.log(existuser);
   if (!existuser) {
    console.log("you are not a registered user ; please sign up");
   }else{
    if (existuser.password == req.body.password) {
      console.log("login successful");

      
    }else{
      console.log("invalid password");
      
    }
   }
  

})

app.post("/addtodo",(req, res)=>{
  console.log(req.body);
  todoarray.push(req.body)
  console.log(todoarray);
  res.redirect('/todo')
})



const port = 8003

app.listen(port,()=>{
    console.log(`app started on port ${port}`);
    
})