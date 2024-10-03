const express = require("express")

const userrouter = express.Router()


userrouter.get("/signup", (req, res)=>{

    res.render("signup",{errormessage})
})

userrouter.get('/login',(req, res)=>{
    res.render("login")
})

module.exports = userrouter