
import React, { useState, useEffect }  from "react";
import {Link, useHistory,useNavigate} from 'react-router-dom';
import Navbar from "./NavBar"
import logo from './javel.jpg';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SummarizeIcon from '@mui/icons-material/Summarize';
import axios from "axios"
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function Client() {
   const [products,setProduct]=useState([])
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [name,setname]=useState()
   const [lastname,setlastname]=useState()
   const [email,setemail]=useState()
   const [societe,setsociete]=useState()
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
  const navigate = useNavigate();


  const   navigateFacture = (idC) => {
    // 👇️ navigate to /
 
    navigate('/Factures/'+idC);
  };
  const handlename = (event) => {
    setname(event.target.value);
  };
  const handlelastname = (event) => {
    setlastname(event.target.value);
  };
  const handleemail = (event) => {
    setemail(event.target.value);
  };
  const handlesociete = (event) => {
    setsociete(event.target.value);
  };
 

    useEffect(()=>{
    const token =JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:5000/client',{ headers: {"Authorization" : `SVP ${token}`} })
    .then(res=>{
console.log('res.data',res.data)
      setProduct(res.data)
    })
    },[])

    const submitclient=()=>{
      const token =JSON.parse(localStorage.getItem('token'))
      axios.post('http://localhost:5000/client/addclient',{name,lastname,email,societe},{ headers: {"Authorization" : `SVP ${token}`} })
      .then(res=>{
        console.log('res.data',res.data)
        if(res.data.client){
          axios.get('http://localhost:5000/client',{ headers: {"Authorization" : `SVP ${token}`} })
          .then(res=>{
      console.log('res.dataaaaaaaa',res.data)
            setProduct(res.data)
            setOpen(false)
          })
        }
         
             
            })
    }
    const deleteclient=(item)=>{
      console.log(item,"item")
      const token =JSON.parse(localStorage.getItem('token'))
      axios.delete('http://localhost:5000/client/'+item,{ headers: {"Authorization" : `SVP ${token}`} }).then(res=>{
        console.log('res.data',res.data)
        setProduct(res.data)
      })
    }
 
    return (
     <div>
        <Navbar />
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography  variant="h3" gutterBottom component="div" >
        Liste des Clients
                </Typography>
                <Button variant="contained" color="primary" style={{marginRight: "10%", marginTop: "2%"}}  onClick={handleOpen}>
   <AddCircleOutlineIcon />  Ajouter Client
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
           Ajouter produit
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
          id="outlined-number"
          label="Name"
          type="text"
          value={name}
          onChange={handlename}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Last name"
          type="text"
          value={lastname}
          onChange={handlelastname}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Email"
          type="text"
          value={email}
          onChange={handleemail}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Societe"
          type="text"
          value={societe}
          onChange={handlesociete}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
     
     
        <br/>
    

<Button variant="contained" color="primary" style={{marginRight: "10%", marginTop: "2%"}} onClick={submitclient}>
   <AddCircleOutlineIcon />  Ajouter Client
</Button>
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
         {/* <CardMedia
           component="img"
           height="180"
           image={logo}
           alt="green iguana"
         /> */}
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
            Nom : {item.name}
           </Typography>

           
           <Typography gutterBottom variant="h6" component="div">
          Prenom  :   {item.lastname} 
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Societe  :   {item.societe} 
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Email :   {item.email} 
           </Typography>
        
         </CardContent>
         <CardActions>
          <div style={{marginLeft:"70%"}}>
         <SummarizeIcon    onClick={()=>navigateFacture(item._id)}
           />
         <DeleteIcon onClick={()=>deleteclient(item._id)}  sx={{ color: "#f31100" }}  />
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
  
  export default Client;
  