import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import BankServices from '../../BankService/BankServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { HttpStatusCode } from 'axios';
const CardList = (props) => {
  
 function renewCard(id)
 {
   BankServices.updateCard(id).then((obj)=>displayMassage(obj));
 }
  
    function displayMassage(obj){
      const message = document.getElementById('message2');
    var bool=  obj.status===HttpStatusCode.Accepted ? true :false;
    if (bool) {
      message.textContent = obj.data;
      alert(obj.data);
      message.style.color = 'green';
      props.renderHandler();
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
    }
  }
  function onUpdate(item)
  {
    props.updateHandler(item);
  }

    return (
      // <div className="bg_welcome">
    
      <section className='py-3 px-5'>
      <h3>All Cards Information</h3>
      <div id="message2"></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>cardNetwork</th>
            <th>cardType</th>
            <th>CVV</th>
            <th>expiry Date</th>
            <th>creation Date</th>
            <th>max Transfer Amount</th>
           <th>Options</th>        
          </tr>
        </thead>
        <tbody>
          {/* Map through the data array to generate table rows dynamically */}
        {props.list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.cardNetwork}</td>
              <td>{item.cardType}</td>
              <td>{item.cvv}</td>
              <td>{item.expiryDate}</td>
              <td>{item.creationDate}</td>
              <td>{item.maxTransferAmount}</td>
            {props.isActive===true?<td> <Button onClick={(e)=>onUpdate(item)}>update Limit</Button></td>:<td> <Button onClick={(e)=>renewCard(item.id)}>Renew Card</Button></td>}
            </tr>
          ))}
        </tbody>
      </Table>
      </section>
      // </div>
    );
}

export default CardList;

