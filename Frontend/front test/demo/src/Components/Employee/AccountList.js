import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import BankServices from '../../BankService/BankServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { HttpStatusCode } from 'axios';

const AccountList = (props) => {

   function ToSuspend(id)
   {
      console.log(id);
     // BankServices.suspendUser(id).then((obj)=>displayMassage(obj));
     props.renderHandler(); // testing purpose
   }
    function displayMassage(obj){
      const message = document.getElementById('message2');
    var bool=  obj.status===HttpStatusCode.Ok ? true :false;
    if (bool) {
      message.textContent = obj.data;
      alert(obj.data);
      message.style.color = 'green';
      props.renderHandler();
      
    } else {
      message.textContent = 'Problem with Server !';
      message.style.color = 'red';
    }
  }

    return (
      
      <section className='py-3 px-5'>
      <h3>All Accounts Information</h3>
      <div id="message2"></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>branch Name</th>
            <th>phone No</th>
            <th>gender</th>
            <th>Balance</th>
           <th>Options</th>
           {props.isSuspend===true && <th>ToSuspend</th>}          
          </tr>
        </thead>
        <tbody>
          {/* Map through the data array to generate table rows dynamically */}
          {props.list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.branchName}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.gender}</td>
              <td>{item.balance}</td>
              {props.isSuspend===true ?  <td><Button onClick={(e)=>ToSuspend(item.id)}>Suspend</Button></td> :<h3>Active</h3>}
              </tr>
          ))}
        </tbody>
      </Table>
      </section>
    );
}

export default AccountList;
