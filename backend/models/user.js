

const mongoose= require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const userSchema= new mongoose.Schema({
    name:{
        type:String,
    
    },
    lastname:{
        type:String,
    
    },
    email:{
        type:String,
    
    },
    password:{
        type:String,
    
    },
   
    photo:{
        type:String,   
    },
 
  

})

mongoose.model("User",userSchema)