const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema.Types
const produitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:'no photo'
    },
    prix:{
        type:String,
        required:true
    },
    quantite:{
        type:Number,
        required:true
    },
    reference:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date_pub:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
  
})

module.exports =mongoose.model("Produit",produitSchema)