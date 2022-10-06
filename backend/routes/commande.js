const express = require ("express")
const router = express.Router()
const mongoose=require('mongoose')

const Commande=mongoose.model('Commande')
const Produit=mongoose.model('Produit')
const requireLogin = require('../middleware/requireLogin')

router.get('/',requireLogin,(req,res)=>{
    Commande.find()
    .populate('postedBy',"name lastname")
    .populate('commandeBy',"name lastname")
    .populate('productId',"name prix quantite reference type photo")
    .sort({_id:-1})
    .then((result)=>{
        res.send(result)
    })
})

router.post('/addcommande',requireLogin,(req,res)=>{
    const {quantite,somme,postedBy,commandeBy,productId}=req.body.data
    if(!postedBy || !commandeBy || !productId  ){
        
        return res.status(422).json({error:"please add all fields"})
    }

    const commande = new Commande({
        quantite,somme,postedBy,commandeBy,productId
       
    })

    commande.save().then(result=>{
        {
            Produit.findById(
               { _id:productId}
             ).then((resulte)=>{
                console.log(resulte)
                
                resulte.quantite=resulte.quantite-quantite
                var products=resulte
                console.log(products)
                Produit.findByIdAndUpdate(
                    productId,
                {quantite:products.quantite},
                { new: true },
                ).then(resul=>{
                    res.send(resul)
                })
             })
            
        }
      //  res.json({result})
    })
})

router.get('/:id',requireLogin,(req,res)=>{
    Commande.findById({_id:req.params.id})
    .populate('postedBy',"name lastname")
    .populate('commandeBy',"name lastname")
    .populate('productId',"name prix quantite reference type")
    .then((result)=>{
        res.send(result)
    })
})

router.delete('/:id',requireLogin,(req,res)=>{
    Commande.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        if(result){
            Commande.find()
            .populate('postedBy',"name lastname")
            .populate('commandeBy',"name lastname")
            .populate('productId',"name prix quantite reference type photo")
            .sort({_id:-1})
            .then(resul=>{

                res.send(resul)
            })
        }
    })
})

router.put("/:id", function (req, res) {
    var CliId = req.params.id;
    Commande.findOneAndUpdate(
      { _id: CliId },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        res.json(doc);
      }
    );
  });

  router.get('/usercommande/:id',requireLogin,(req,res)=>{
    Commande.find({commandeBy:req.params.id})
    .populate('postedBy',"name lastname")
    .populate('commandeBy',"name lastname")
    .populate('productId',"name prix quantite reference type")
    .then((result)=>{
        res.send({result})
    })
})

router.get('/productcommande/:id',requireLogin,(req,res)=>{
    Commande.find({productId:req.params.id})
    .populate('postedBy',"name lastname")
    .populate('commandeBy',"name lastname")
    .populate('productId',"name prix quantite reference type")
    .then((result)=>{
        res.send(result)
    })
})




module.exports = router