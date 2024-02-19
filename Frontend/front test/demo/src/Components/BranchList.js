import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import BankServices from '../BankService/BankServices';
import Table from 'react-bootstrap/Table';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';
import { useSession } from '../Security/SessionContext';
import Authentication from '../Security/SessionContext';
import { HttpStatusCode } from 'axios';
const BranchList = () => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
    const [list,setList]=useState([{id:1,branchName:'ajmer',phoneNo:'7896544322',street:'shiv road',city:'mumbai',state:'MHA',country:'India'}]);
const history=useHistory();
    useEffect(()=>{
      BankServices.getBranches().then((obj) => displayMassage(obj));
        
        // if(!Authentication.checkAutherization('employee',isLoggedIn,setIsLoggedIn))
        // history.push('/user_login');
    },[])
 function displayMassage(obj) {
        const message = document.getElementById("message");
        var bool=obj.status===HttpStatusCode.Ok ? true:false;
        if (bool) {
         // message.textContent = "Successfully Changed !";
          message.style.color = "green";
          setList(obj.data);
        } else {
          message.textContent = "Problem with Server !";
          message.style.color = "red";
        }
      }
  return (
    <div className="bg_profile">
      <section className="py-3 px-5">
        <h2>Branch List</h2>
        <hr/>
        <div id="message"></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Branch Name</th>
              <th>Phone No</th>

              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the data array to generate table rows dynamically */}
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.branchName}</td>
                <td>{item.phoneNo}</td>
                <td>{item.street}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
  }
  
  export default BranchList
  
  // private Long id;
  // private String branchName;
  // private String phoneNo;