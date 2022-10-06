const express = require ("express")
const app = express()
const port = 5000
const cors = require('cors');
const mongoose=require('mongoose')
const{MONGOURI}= require("./key")


require('./models/user')
require('./models/client')
require('./models/produit')
require('./models/commande')

app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
const produitRoute = require('./routes/produit')
const commandeRoute = require('./routes/commande')
const clienttRoute = require('./routes/client')
app.use("/products",produitRoute)
app.use("/client",clienttRoute)
app.use("/commande",commandeRoute)

mongoose.connect(MONGOURI,{
    useUnifiedTopology: true , useNewUrlParser: true 
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB atlas")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})


app.listen(port,()=>{
    console.log(`Server listening on  http://localhost:${port}/`);
})


module.exports = app