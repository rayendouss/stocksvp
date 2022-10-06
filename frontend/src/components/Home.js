
import React, { useState, useEffect }  from "react";
import {Link, useHistory} from 'react-router-dom';
import Navbar from "./NavBar"
import logo from './javel.jpg';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import M from "materialize-css"
import ImageIcon from '@mui/icons-material/Image';

function Home() {
   const [products,setProduct]=useState([])
   const [productd,setproductd]=useState({})
   const [maxquantite,setmaxquantite]=useState()
   const [name,setname]=useState()
   const [description,setdescrption]=useState()
   const [prix,setprix]=useState()
   const [quantite,setqt]=useState()
   const [type,settype]=useState()
   const [idproduit,setidproduit]=useState()
   const [reference,setreference]=useState()
   const [clients,setClients]=useState({})
   const [open, setOpen] = useState(false);
   const [openup, setOpenup] = useState(false);
   const [open2, setOpen2] = useState(false);
   const [image,setimage]=useState()
   const handleOpen = () =>setOpen(true);
   const handleClose = () => setOpen(false);
   const handleClose2 = () => setOpen2(false);
   const handleCloseup = () => setOpenup(false);

   const handleOpenup = (detail) =>{ 
    console.log('detail',detail)
    setOpenup(true)
     setproductd(detail)
     setname(detail.name)
     setdescrption(detail.description)
     setprix(detail.prix)
     setqt(detail.quantite)
     settype(detail.type)
     setreference(detail.reference)
     setimage(detail.photo)
     setidproduit(detail._id)

    
  };

   const handleOpen2 = (detail) =>{ 
 
    setOpen2(true)
     setproductd(detail)
     setmaxquantite(detail.quantite)
  };
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
  const [clientid, setclientid] = React.useState('');
 const  handleChangequantite =(event)=>
   { console.log('event.target.value',event.target.value)  
      setmaxquantite(event.target.value)   }
  const handleChange = (event) => {
    setclientid(event.target.value);
  };
  const handlename = (event) => {
    setname(event.target.value);
  };
  const handledescription = (event) => {
    setdescrption(event.target.value);
  };
  const handleprix = (event) => {
    setprix(event.target.value);
  };
  const handletype = (event) => {
    settype(event.target.value);
  };
  const handlequantite = (event) => {
    setqt(event.target.value);
  };
  const handlereference = (event) => {
    setreference(event.target.value);
  };
  useEffect(()=>{
    console.log('clients',clientid)
  },[clientid])


  useEffect(()=>{
    const token =JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:5000/client',{ headers: {"Authorization" : `SVP ${token}`} })
    .then(res=>{

      setClients(res.data)
    })
    },[])


    useEffect(()=>{
    const token =JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:5000/products',{ headers: {"Authorization" : `SVP ${token}`} })
    .then(res=>{
      
      setProduct(res.data)

    })
    },[])

    const updateproduit=()=>{
      console.log('productd',name,description,prix,quantite,type,reference,image)
      const token =JSON.parse(localStorage.getItem('token'))
      const data= new FormData()
      data.append("file",image)
      data.append("upload_preset","stagePFE")
      data.append("cloud-name","mernrayen")
      fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data =>{
      setimage(data.url)
      console.log(data.url)
      axios.put('http://localhost:5000/products/'+idproduit,{name,description,prix,quantite,type,reference,photo:data.url},
       { headers: {"Authorization" : `SVP ${token}`} }
       ).then(res=>{
        console.log('res.data',res.data)
        setProduct(res.data)
        setOpenup(false)
       })
  })
}

     
    const submitproduct=()=>{
      const token =JSON.parse(localStorage.getItem('token'))
    console.log('variable',name,description,prix,quantite,type,reference,image)
    const data= new FormData()
    data.append("file",image)
    data.append("upload_preset","stagePFE")
    data.append("cloud-name","mernrayen")
    fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data =>{
     
       setimage(data.url)
       console.log(data.url)
       axios.post('http://localhost:5000/products/addProduct',{name,description,prix,quantite,type,reference,photo:data.url},
       { headers: {"Authorization" : `SVP ${token}`} }
       ).then(res=>{
        console.log('res.data',res.data.post)
        if(res.data.post){
          axios.get('http://localhost:5000/products',{ headers: {"Authorization" : `SVP ${token}`} })
          .then(res=>{
            
            setProduct(res.data)
            setOpen(false)
          })
        }
       })
     
      
     
    })
    }
    const deleteproduit=(item)=>{
      console.log(item,"item")
      const token =JSON.parse(localStorage.getItem('token'))
      axios.delete('http://localhost:5000/products/'+item,{ headers: {"Authorization" : `SVP ${token}`} }).then(res=>{
        setProduct(res.data)
      })
    }

   const submitCommande=()=>{
    const token =JSON.parse(localStorage.getItem('user'))
    const token2 =JSON.parse(localStorage.getItem('token'))
       const data = {
        quantite:parseInt(maxquantite),
        somme:maxquantite * productd.quantite,
        postedBy:token._id,
        commandeBy:clientid,
        productId:productd._id
       }
       console.log('data',data)
     axios.post('http://localhost:5000/commande/addcommande',{data},{ headers: {"Authorization" : `SVP ${token2}`} })
     .then(res=>{
      
      if(res.status==200){
        setOpen2(false)
        M.toast({html:"commande ajouté"})
      }
     })
     .catch(err=>{
      console.log('err',err)
            M.toast({html:err.response.data})
        
     })
    }
   
    return (
     <div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Ajouter commande
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Clients</InputLabel>
       {clients.length>0 && <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={clientid}
          label="Clients"
          onChange={handleChange}
        >

          { clients.map((item,index)=>{
            return(
              <MenuItem id={index} value={item._id}>{item.name} {item.lastname}</MenuItem>
            )
          
          })
             }
        
        </Select>}
        <br/>
      
       <TextField
          id="outlined-number"
          label="Number"
          type="number"
          value={maxquantite}
          onChange={handleChangequantite}
        
          InputLabelProps={{
            shrink: true,
          }}
        />


                <Button variant="contained" color="primary" style={{marginTop: "2%"}} onClick={submitCommande}>
   <AddCircleOutlineIcon />  Ajouter Commande
</Button>


         
             {/* <select>
          {countriesList}
        </select> */}
      </FormControl>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openup}
        onClose={handleCloseup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Modifier Produit
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <FormControl fullWidth>
      
    
        <br/>
        <TextField
          id="outlined-number"
          label="Name"
          type="text"
          value={name}
          onChange={handlename}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
         <TextField
          id="outlined-number"
          label="Description"
          type="text"
          value={description}
          onChange={handledescription}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
          <br/>
 <TextField
          id="outlined-number"
          label="Prix"
          type="text"
          value={prix}
          onChange={handleprix}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
          <br/>
         <TextField
          id="outlined-number"
          label="Quantite"
          type="Number"
          value={quantite}
          onChange={handlequantite}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
          <br/>
         <TextField
          id="outlined-number"
          label="Type"
          type="text"
          value={type}
          onChange={handletype}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
          <br/>
         <TextField
          id="outlined-number"
          label="Reference"
          type="number"
          value={reference}
          onChange={handlereference}
        
          InputLabelProps={{
            shrink: true,
          }}
        />
          <br/>
         <Button
        style={{backgroundColor: "#df1212"}}
         sx={{ mt: 2 }}
         id="outlined-number"
  variant="contained"
  component="label"
>
 <ImageIcon/> Upload Photo
  <input
    type="file"
    hidden
    onChange={e=>setimage(e.target.files[0])}
  />
</Button>

     


                <Button variant="contained" color="primary" style={{marginTop: "2%"}} onClick={updateproduit}>
   <AddCircleOutlineIcon />  update produit
</Button>


         
             {/* <select>
          {countriesList}
        </select> */}
      </FormControl>
          </Typography>
        </Box>
      </Modal>

        <Navbar />
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography  variant="h3" gutterBottom component="div" >
        Liste des Produits
                </Typography>
                <Button variant="contained" color="primary" style={{marginRight: "10%", marginTop: "2%"}} onClick={handleOpen}>
   <AddCircleOutlineIcon />  Ajouter Produit
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
          label="Description"
          type="text"
          value={description}
          onChange={handledescription}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Prix"
          type="text"
          value={prix}
          onChange={handleprix}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Quantite"
          type="text"
          value={quantite}
          onChange={handlequantite}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Type"
          type="text"
          value={type}
          onChange={handletype}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Reference"
          type="text"
          value={reference}
          onChange={handlereference}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <Button
        style={{backgroundColor: "#df1212"}}
         sx={{ mt: 2 }}
         id="outlined-number"
  variant="contained"
  component="label"
>
 <ImageIcon/> Upload Photo
  <input
    type="file"
    hidden
    onChange={e=>setimage(e.target.files[0])}
  />
</Button>

<Button variant="contained" color="primary" style={{marginRight: "10%", marginTop: "2%"}} onClick={submitproduct}>
   <AddCircleOutlineIcon />  Ajouter Produit
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
         <CardMedia
           component="img"
           height="180"
           image={item.photo=="no photo"?logo:item.photo}
           alt="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
            Produit : {item.name}
           </Typography>

           <Typography variant="body2" color="text.secondary">
           Description :  {item.description}
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Prix :   {item.prix} DT
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Quantite :   {item.quantite} 
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
           Réf :   {item.reference} 
           </Typography>
         </CardContent>
         <CardActions style={{display:"flex", justifyContent:"space-around"}}>
         <div  >
         <Button variant="contained" color="primary"   onClick={()=>handleOpen2(item)}>
   <AddCircleOutlineIcon />  Ajouter Commande
</Button> </div>
          <div >
         <DeleteIcon onClick={()=>deleteproduit(item._id)} sx={{ color: "#f31100" }}  />
         <EditIcon onClick={()=>handleOpenup(item)} sx={{ color: "rgb(0 89 255)" }}  />
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
  
  export default Home;
  