const express = require ("express")
const router = express.Router()
const mongoose=require('mongoose')

const Produit=mongoose.model('Produit')
const requireLogin = require('../middleware/requireLogin')

router.get('/',requireLogin,(req,res)=>{
    Produit.find()
    .populate("postedBy","name lastname")
    .sort({_id:-1})
    .then((result)=>{
        res.send(result)
    })
})

router.post('/addProduct',requireLogin,(req,res)=>{
    const {name,description,photo,prix,quantite,type,reference}=req.body
    if(!name || !description || !prix || !quantite || !type || !reference ){
        return res.status(422).json({error:"please add all fields"})
    }

    const produit = new Produit({
        name,description,prix,quantite,type,reference,photo,
        postedBy:req.user
    })

    produit.save().then(result=>{
        res.json({post:result})
    })
})

router.get('/:id',requireLogin,(req,res)=>{
    Produit.findById({_id:req.params.id})
    .populate("postedBy","name lastname")
    .then((result)=>{
        res.send(result)
    })
})

router.delete('/:id',requireLogin,(req,res)=>{
    Produit.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        if(result){
            Produit.find()
            .sort({_id:-1})
            .then(resul=>{
                res.send(resul)
            })
        }
    })
})

router.put("/:id", function (req, res) {
    var CliId = req.params.id;
    Produit.findOneAndUpdate(
      { _id: CliId },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        Produit.find()
        .sort({_id:-1})
        .then(resul=>{
            res.send(resul)
        })
      }
    );
  });

module.exports = router