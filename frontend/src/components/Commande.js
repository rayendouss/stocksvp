
import React, { useState, useEffect }  from "react";
import {Link, useHistory} from 'react-router-dom';
import Navbar from "./NavBar"
import logo from './javel.jpg';
import Grid from '@mui/material/Grid';
import axios from "axios"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
function Commande() {
   const [products,setProduct]=useState([])
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
  };
    useEffect(()=>{
    const token =JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:5000/commande',{ headers: {"Authorization" : `SVP ${token}`} })
    .then(res=>{
console.log('res.data',res.data)
      setProduct(res.data)
    })
    },[])

    const deletecommande=(item)=>{
      console.log(item,"item")
      const token =JSON.parse(localStorage.getItem('token'))
      axios.delete('http://localhost:5000/commande/'+item,{ headers: {"Authorization" : `SVP ${token}`} }).then(res=>{
        console.log('res.data',res.data)
        setProduct(res.data)
      })
    }
   
    return (
     <div>
        <Navbar />
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography  variant="h3" gutterBottom component="div" >
        Liste des Commandes
                </Typography>
                <Button variant="contained" color="primary" style={{marginRight: "10%", marginTop: "2%"}}  onClick={handleOpen}>
   <AddCircleOutlineIcon />  Ajouter Commande
</Button>
</div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Ajouter commande
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
        {
         products.length>0 && 
        
              <Grid container style={{marginTop:"10px" }}>
               
             {products.map((item)=>{
      return (  
    <div>
      <Card sx={{ maxWidth: 345 }} style={{marginLeft:"20px" ,marginTop:"10px" }} >
         <CardMedia
           component="img"
           height="180"
           image={item.productId.photo=="no photo"?logo:item.productId.photo}
           alt="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
            Produit : {item.productId.name}
           </Typography>

           
           <Typography gutterBottom variant="h6" component="div">
           Prix :   {item.productId.prix} DT
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Quantite  :   {item.quantite} 
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Réf :   {item.productId.reference} 
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Somme :   {item.productId.prix *item.quantite } DT
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Commande by :   {item.commandeBy.name} {item.commandeBy.lastname} 
           </Typography>
         </CardContent>
         <CardActions>
          <div style={{marginLeft:"70%"}}>
         <DeleteIcon onClick={()=>deletecommande(item._id)} sx={{ color: "#f31100" }}  />
         <EditIcon sx={{ color: "rgb(0 89 255)" }}  />
         </div>
         </CardActions>
       </Card>


       </div>

         
   
      )
          })}
        
          </Grid>
         
        }
        </div>
     
    );
  }
  
  export default Commande;
  