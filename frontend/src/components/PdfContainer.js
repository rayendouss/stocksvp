/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  console.log("p",props)
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
    
        
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
        <Button className="product-btn-add-to-cart shadow-none "
         onClick={createPdf} 
            >
              
              <FontAwesomeIcon
                icon={faDownload}
                className="product-btn-add-to-cart-icon"
              />
 generate la fiche de livraison
            
            </Button>
    </section>
  )
}