const mongoose = require('mongoose');
var User = mongoose.model("User")
const jwt =require("jsonwebtoken")
const {JWT_SECRET} = require("../key");


module.exports =(req,res,next)=>{
    const {authorization}= req.headers

    if(!authorization){
     
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("SVP ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
        
        
            return res.status(401).json({error:"you must be logged in"})

        }
        const{_id}= payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
     
    })
}