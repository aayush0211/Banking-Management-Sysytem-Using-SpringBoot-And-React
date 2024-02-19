import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BankServices from '../../BankService/BankServices';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { HttpStatusCode } from 'axios';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function InletOutletMoneyForm() {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [transactionType, setTransactionType] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [list, setList] = useState([]);
  const history = useHistory();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
  
      if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
      history.push('/employee_login');

    BankServices.getBranches().then((obj) => displayMassage(obj, true));
  }, []);
  const handleTransactionTypeChange = (event) => {
    const value = event.target.value;
    setTransactionType(value);

    // Reset other state values when transaction type changes
    setSelectedBranch('');

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform actions based on the selected transaction type and values here
    console.log('Transaction Type:', transactionType);
    console.log('Selected Brancg:', selectedBranch);
    if (transactionType === 'inlet') {
      BankServices.getAllInletAmountInBranch(selectedBranch).then((obj) => displayMassage(obj))

    }
    else if (transactionType === 'outlet') {

      BankServices.getAllOutletAmountInBranch(selectedBranch).then((obj) => displayMassage(obj));

    }
    else if (transactionType === 'total') {

      BankServices.getTotalAmountInBranch(selectedBranch).then((obj) => displayMassage(obj));

    }
  };
  function displayMassage(obj, flag = false) {
    const message = document.getElementById('message');
    const money = document.getElementById('money');
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      if (flag)//run for getallbranches
      { setBranches(obj.data) }
      else //run for create new employee
      {
    //    message.textContent = 'Amount received !!';
        message.style.color = 'green';
        money.textContent = `Amount :- ${obj.data}`;
      }
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
    }
  }
  return (
    <div className="bg_adduser">

      <div className="d-flex justify-content-center align-items-center ">
        
          <Form onSubmit={handleSubmit} className='mt-5 pt-5'>
            <div id="message"></div>
            <div className="d-flex flex-row m-3">

              <Form.Group controlId="transactionType" className="mb-3 px-1">
                <Form.Label>Amount Type</Form.Label>
                <Form.Control as="select" required value={transactionType} onChange={handleTransactionTypeChange}>
                  <option value="">Select Transaction Type</option>
                  <option value="inlet">Amount Credit in Branch</option>
                  <option value="outlet">Amount Debit from Branch</option>
                  <option value="total">Total Balance in Branch</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="branchId">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  as="select"
                  name="branchId"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="px-3 m-2">
              Submit
            </Button>
            <Link to='/admin/welcome'>
              <Button variant="primary" type="button">
                Back
              </Button></Link>
          <hr/>
          <h2 id='money'></h2>
          </Form>
        </div>
      </div>
    
  );
}


export default InletOutletMoneyForm;
