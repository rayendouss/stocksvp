import React ,{useContext}from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Navbar=()=>{

  const history = useNavigate()
 
  const renderList = () =>{
    
     return[
        <li><Link to="/Home">Products</Link></li>,
        <li><Link to="/Commandes">Commandes</Link></li>,
      <li><Link to="/Clients">Clients</Link></li>,
     
    
      <li>
      <button className="btn #c62828 red darken-3"
      onClick={()=>{
        localStorage.clear()
     
        history('/')
      }}
      >
     Logout
      </button>
    </li>
     
     ]
    
    
  }
    return (
        <nav>
        <div className="nav-wrapper white "  >
          <Link to="/Home" className="brand-logo left">SVP</Link>
          <ul id="nav-mobile" className="right">
          {renderList()}
          </ul>
        </div>
      </nav>
    )
}
export default Navbar ;