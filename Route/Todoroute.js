const express = require("express")
const todorouter = express.Router()

const {displaytodo, addtodo, Deletetodo, getEdit, Updatetodo} = require("../Controllers/Todocontroller")

todorouter.get("/todo", displaytodo)
todorouter.post("/addtodo", addtodo)
todorouter.post("/deletetodo", Deletetodo)
todorouter.get("/edit/:id", getEdit)
todorouter.post("/edittodo/:id", Updatetodo )


module.exports = todorouter