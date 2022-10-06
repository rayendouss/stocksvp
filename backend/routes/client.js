const express = require ("express")
const router = express.Router()
const mongoose=require('mongoose')

const Client=mongoose.model('Client')
const requireLogin = require('../middleware/requireLogin')

router.get('/',requireLogin,(req,res)=>{
    Client.find()
   
    .then((result)=>{
        res.send(result)
    })
})

router.post('/addclient',requireLogin,(req,res)=>{
    const {name,lastname,photo,email,societe}=req.body
    if(!name || !lastname  ){
        return res.status(422).json({error:"please add all fields"})
    }

    const client = new Client({
        name,lastname,photo,email,societe
       
    })

    client.save().then(result=>{
        res.json({client:result})
    })
})

router.get('/:id',requireLogin,(req,res)=>{
    Client.findById({_id:req.params.id})
   
    .then((result)=>{
        res.send(result)
    })
})

router.delete('/:id',requireLogin,(req,res)=>{
    Client.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        if(result){
            Client.find()
            .then(resul=>{
                res.send(resul)
            })
        }
    })
})

router.put("/:id", function (req, res) {
    var CliId = req.params.id;
    Client.findOneAndUpdate(
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



module.exports = router
