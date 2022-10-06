import React, { useState, useEffect }  from "react";
import {Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import M from "materialize-css"

function Login() {
    const navigate=useNavigate()
    const[password,setPassword]= useState("")
    const[email,setEmail]= useState("")
    const PostData = ()=>{
  
     const data ={email,password}
     axios.post('http://localhost:5000/signin',data).then(res=>{
      
        if(res.status==200){
            localStorage.setItem('token',JSON.stringify(res.data.token))
            localStorage.setItem('user',JSON.stringify(res.data.user))
            navigate('/Home')
        }
      
     })
     .catch(err=>{
      console.log('err',err)
            M.toast({html:err.response.data})
        
     })
    // navigate('/Home')
    }
    return (
 
           <div className="mycard">
        <div className="card auth-card input-field">
      <h2>Signin</h2>
   
    <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>

<button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
Login
</button>

               </div>
        </div>
    
    );
  }
  
  export default Login;