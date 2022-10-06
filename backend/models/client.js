

const mongoose= require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const clientSchema= new mongoose.Schema({
    name:{
        type:String,
    
    },
    lastname:{
        type:String,
    
    },
    email:{
        type:String,
        default:""
    },
    photo:{
        type:String,  
        default:"" 
    },
    
    societe:{
        type:String, 
        default:""  
    },
 
  

})

mongoose.model("Client",clientSchema)