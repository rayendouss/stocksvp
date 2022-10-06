import axios from "axios";
import React, { useState, useEffect,useRef }  from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./NavBar"
import logo from "./logo.png"
import Typography from '@mui/material/Typography';
import '@progress/kendo-theme-default/dist/all.css';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import TextField from '@mui/material/TextField';
import { Button } from "@progress/kendo-react-buttons";
import Doc from './DocService';
import DatePicker from 'react-date-picker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ReactToPrint from 'react-to-print';
import domtoimage from "dom-to-image";
import pdfMake from "pdfmake/build/pdfmake";

function Facture(){
  const pdfExportComponent=useRef(null)
  const contentArea=useRef(null)
  const componentRef = useRef();

  const handleExportWithComponent=(event)=>{
    pdfExportComponent.cuurent.save()
  }
  const handleExportWithMethod=(event)=>{
    savePDF(contentArea.current,{paperSize:"A4"})
  }

    const ids = ["1"];
    let { id } = useParams();
    const [facture,setFacture]=useState({})
    const [somme,setSomme]=useState()
    const [startDate, setStartDate] = useState();
    useEffect(()=>{
        const token =JSON.parse(localStorage.getItem('token'))
        var sum = 0 
           axios.get('http://localhost:5000/commande/usercommande/'+id,{ headers: {"Authorization" : `SVP ${token}`} })
           .then(res=>{
           
            setFacture(res.data.result)
          var  datalist=res.data.result
          datalist.map((item)=>{
               
               sum = sum +(parseInt(item.productId.prix) * item.productId.quantite)
            })
            setSomme(sum)
           })
    },[])

    var pdfExportSetting = {
      pageSize: "A4",
      pageOrientation: "portrait",
      content: [],
    };
    const generatePDF = async () => {

     console.log('dkhal1')
        
        const couverture = document.getElementById("couverture");
        const scale = 4;
        try {
          console.log('dkhal2')
        
          const couvertures = await domtoimage.toPng(couverture, {
            width: couverture.clientWidth * scale,
            height: couverture.clientHeight * scale,
            style: {
              transform: "scale(" + scale + ")",
              transformOrigin: "top left",
            }
       
          });
          console.log('dkhal3',couvertures)
        
          pdfExportSetting.content.push({
            width: 580, // for 50 % image width
            height: 830, // change the numbers accordingly
            absolutePosition: {
              // absolute positioning if required
              x: 15,
              y:-15
            
            },
    
            image: couvertures,
          })
          console.log('dkhal4')
        
          var nomFichier =
          "[ WEALZY ]-Dossier investissement-" 
          
        pdfMake.createPdf(pdfExportSetting).download(nomFichier);
       
        } catch (e) {
          console.log("couverture", e);
        }
    
    };
    // useEffect(()=>{
    //  console.log('value',value)
    // },[value])

    // const createPdf = (html) => Doc.createPdf(html);

    return(
        <div>
             <Navbar />
        <div >
    
   Date : <DatePicker selected={startDate} onChange={(date) => setStartDate(date.toLocaleDateString())} />
      
          <div ref={componentRef} style={{padding:"10px"}} id={"couverture"}>
          <div style={{display:"flex",marginTop:"1%",justifyContent:"space-between"}}>
         <div> 
          <div style={{display:"flex"}} >
        <img src={logo} height={100} width={100} />
        <Typography  variant="h4" gutterBottom component="div" >
        Sassi Vente Produits
                </Typography>
              </div>
              <Typography  variant="h5" gutterBottom component="div" style={{fontWeight: "bold" ,marginLeft:"10%"}}>
      BL FACTURE N 
                </Typography>

                <Typography  variant="h4" gutterBottom component="div"  style={{marginTop:"25%"}}>
        Date : {startDate}
       
                </Typography>
                </div>
                <br />
                
               
              <div style={{marginRight: "10px"}}>
                <div style={{border:"2px solid" ,height:"100px",width:"280px"}}>
          <h6>M/F: </h6>
          <h6>03, Moscou, Monfleury, Tunis 1089</h6>
          <h6>GSM:22222222</h6>
        </div>
        <div style={{border:"2px solid" ,height:"130px",width:"280px",marginTop:"1px"}}>
          <h6>Client: </h6>
          <h6>Adresse:</h6>
          <h6>MAT.F:</h6>
          <h6>TEL:</h6>
        </div>
        </div>
        </div>
       
       

              { facture.length > 0 && 
              <div>
              
               
               <div style={{marginRight: "10%", marginTop: "1%"}} >
      <table  style={{ padding:"10px", width: "100%"}}>
        <tr>
       
          
            <th style={{border: "1px solid ", textAlign: "left"}} >Arts</th>
            <th style={{border: "1px solid ", textAlign: "left"}} >Designation</th>
            <th style={{border: "1px solid ", textAlign: "left"}} >Prix U. TTC</th>
            <th style={{border: "1px solid ", textAlign: "left"}} >Qts</th>
            <th style={{border: "1px solid ", textAlign: "left"}} >Total TTC</th>
         
        </tr>
        
          {facture.map((row) => (
            <tr
            
            >
              <td style={{border: "1px solid ", textAlign: "left"}} >
                {row.productId.reference}
              </td>
              <td style={{border: "1px solid ", textAlign: "left"}} >{row.productId.name}</td>
              <td style={{border: "1px solid ", textAlign: "left"}} >{parseInt(row.productId.prix)}</td>
              <td style={{border: "1px solid ", textAlign: "left"}} >{row.productId.quantite}</td>
              <td style={{border: "1px solid ", textAlign: "left"}} >{parseInt(row.productId.prix) * row.productId.quantite}</td>
            </tr>
          ))}
        
      </table>
      
    </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <Typography  variant="h6" gutterBottom component="div" >
        Arrete la presente facture a la somme de :
                </Typography>
    
      <table 
      style={{  "width": "27%",
        "margin-right": "10%",
        "margin-top": "5px" }}>
       
  <tr>
   
    <th style={{border: "1px solid ", textAlign: "left"}} >
        Droit de Timbre
        </th>
        <th style={{border: "1px solid ", textAlign: "left"}}  >
             10
        </th>
        </tr>
        <tr>
        <th style={{border: "1px solid ", textAlign: "left"}} >
        Total TTC
        </th>
        <th style={{border: "1px solid ", textAlign: "left"}}  >
        {somme} DT
        </th>
        </tr>
      </table>
      </div>
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <h6  style={{fontWeight: "bold" }}>
     Reçu conforme client
                </h6>

                <h6  style={{fontWeight: "bold" }}>
     Signature et cachet
                </h6>
      </div>

        
        
   </div> }
   </div>
  
   <Button onClick={()=>generatePDF()}>telecharger</Button>
   <Button>
   {/* <ReactToPrint
        trigger={() => <button>télécharger!</button>}
        content={() => componentRef.current}
      /> */}
   </Button>
                </div>
            
        </div>
    )
}

export default Facture;