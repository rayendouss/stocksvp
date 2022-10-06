const express = require ("express")
const router = express.Router()
const mongoose=require('mongoose')
const jwt= require('jsonwebtoken')
const {JWT_SECRET} =require('../key')
const User=mongoose.model('User')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup',(req,res)=>{
   const {name,lastname,email,password}=req.body
   
    if(!email || !password || !name || !lastname){       
       return res.status(422).json({error:"please add the fileds"})
    }
      
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(500).json({error:"user already exists"})
        }
        const user = new User({
            name,
            lastname,
            email,
            password
         })
         user.save()
         .then(result=>{
            res.json({message:"successfully posted"})
         })
     })
  
    

   
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
     return   res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email,password:password})
    .then(user=>{
        if(user){
     
            const token = jwt.sign({_id:user._id},JWT_SECRET)
            return res.json({token,user})
            // res.json({message:"successfully signed in"})
        }
        else {
            return res.status(422).json("invalid email or password")
        }
    })
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send('allo bro')
})

module.exports = router