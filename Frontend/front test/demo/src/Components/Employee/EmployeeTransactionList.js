import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Table from 'react-bootstrap/Table';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
const EmployeeTransactionList = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
    const [list,setList]=useState(props.list);
    const history=useHistory();
    useEffect(()=>{
      if(!Authentication.checkAutherization('MANAGER',isLoggedIn,setIsLoggedIn))
      history.push('/employee_login');
    },[])

    return (
      <section className='py-3 px-5'>
      <h3>All Employee Informations</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>transaction Type </th>
            <th>account No</th>
            <th>amount</th>
            <th>transaction Date</th>
            <th>receiver Account No</th>
            </tr>
        </thead>
        <tbody>
          {/* Map through the data array to generate table rows dynamically */}
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.transactionType}</td>
              <td>{item.accountNo}</td>
              <td>{item.amount}</td>
              <td>{item.transactionDate}</td>
              <td>{item.receiverAccountNo}</td>
              </tr>
          ))}
        </tbody>
      </Table>
      </section>
    );
}

export default EmployeeTransactionList;

