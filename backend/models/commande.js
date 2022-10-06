const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema.Types
const commandeSchema = new mongoose.Schema({
   
    somme:{
        type:String,
        required:true
    },
    quantite:{
        type:Number,
        required:true
    },
   
    date_cmd:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    commandeBy:{
        type:ObjectId,
        ref:"Client"
    },
    productId:{
        type:ObjectId,
        ref:"Produit"
    }
  
})

module.exports =mongoose.model("Commande",commandeSchema)