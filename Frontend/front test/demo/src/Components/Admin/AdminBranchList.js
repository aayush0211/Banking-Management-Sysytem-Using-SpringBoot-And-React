import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BankServices from '../../BankService/BankServices';
import { HttpStatusCode } from 'axios';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
import UpdateBranch from './UpdateBranch';
const AdminBranchList = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
    const [list,setList]=useState([{id:1,empId:0,branchName:'ajmer',phoneNumber:'7896544322',street:'shiv road',city:'mumbai',state:'MHA',country:'India'}]);
    const history=useHistory();
    useEffect(()=>{
      
        if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
        history.push('/employee_login');
         BankServices.getBranches().then((obj)=>displayMassage(obj)).catch((err)=>displayMassage(err)) 
    },[])
    function displayMassage(obj){
      const message = document.getElementById('message');
      var bool= obj.status===HttpStatusCode.Ok ? true : false;
      if (bool) {
       // message.textContent = 'List of Branches :-';
        message.style.color = 'green';
        setList(obj.data);
        
      } else {
        message.textContent = obj.response.data.message;
        message.style.color = 'red';
      }
    }
    function updateHandler(item)
    {
      props.updateBranchHandler(item);
    }
   const ManagerHandler=(item)=>{
        props.addManagerHandler(item); 
   }
    return (
      <div className=" bg_addbranch">
    
    <section className='py-3 px-5'>
    <h3>All Branch Informations</h3>
    <hr/>
        <div id="message"></div>
      <Table striped bordered hover>
      <thead>
          <tr>
            <th>id</th>
            <th>branch Name</th>
            <th>phone No</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>options</th>
            <th>Employee Section</th>
            
          </tr>
        </thead>
        <tbody>
          {/* Map through the data array to generate table rows dynamically */}
          {list.map((item) => (
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.branchName}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.street}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td> <Button onClick={(e)=>updateHandler(item)}>update</Button></td>
              {item.empId===0 ?  <td> <Button onClick={(e)=>ManagerHandler(item)}>Add Manager</Button></td>:<td>Employee already Added</td>}
            </tr>
          ))}
          </tbody>
          </Table>
          </section>
          </div>
          );
}

export default AdminBranchList;

// private Long id;
// private String branchName;
// private String phoneNumber;