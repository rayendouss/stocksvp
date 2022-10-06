import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Login from "./components/Login"
import Home from "./components/Home"
import Commande from './components/Commande';
import Client from './components/Clients';
import Facture from './components/Facture';


function App() {
  return (
    <div>
    <Router>
   <Routes>
           <Route exact path ="/" element={<Login/>} />
          
           <Route exact path ="/Home" element={<Home/>} />
           <Route exact path ="/Commandes" element={<Commande/>} />
           <Route exact path ="/Clients" element={<Client/>} />
           <Route exact path ="/Factures/:id" element={<Facture/>} />
           {/* <Route render={()=> <h1>404 page not found</h1>}/> */}
           
    </Routes>
    </Router>
    </div>
  //     <Login />
  //     <Home />
  // aaaaa
  );
}

export default App;
