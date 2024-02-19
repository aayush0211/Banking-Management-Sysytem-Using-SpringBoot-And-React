import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Table from 'react-bootstrap/Table';
const UserTransactionList = (props) => {

    return (
      <section className='py-3 px-5'>
      <h3>All Transactions List</h3>
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
          {props.list.map((item) => (
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

export default UserTransactionList;

