const todomodel = require('../model/Todomodel')


const displaytodo = async(req, res) =>{
   try {
    const alltodo = await todomodel.find()
     console.log(alltodo);
     res.render("todo",{alltodo})
   } catch (error) {
    console.log(error);
    
   }
}

const addtodo = async (req, res) =>{
    console.log(req.body);
    try {
      const todo =  await todomodel.create(req.body)
   if (todo) {
    console.log("todo created successfully");
      res.redirect('/todo/todo')
   }else{
    console.log("error occured");
    
   }
    } catch (error) {
      console.log(error);
      
    }
   
}

const Deletetodo = async(req ,res)=>{
    console.log(req.body);
    try {
      const {id} = req.body
     const deleted =  await todomodel.findByIdAndDelete({_id:id})
     console.log(deleted);
    res.redirect("/todo/todo")
    
      
    } catch (error) {
      console.log(error);
      res.redirect("/todo/todo")
    }
      
}

const  getEdit = async (req, res)=>{
    console.log(req.params.id);
  const {id} = req.params
  try {
   const getedit = await todomodel.findOne({_id:id})
   console.log(getedit);
   res.render("edit", {getedit})
  } catch (error) {
    console.log(error);
    res.redirect("/todo/todo")
  }
}

const Updatetodo = async(req, res)=>{
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
    res.redirect("/todo/todo")
    
  } catch (error) {
    console.log(error);
    res.redirect("todo/edit/:id")
    
  }
}

module.exports = {displaytodo, addtodo, Deletetodo,getEdit, Updatetodo}