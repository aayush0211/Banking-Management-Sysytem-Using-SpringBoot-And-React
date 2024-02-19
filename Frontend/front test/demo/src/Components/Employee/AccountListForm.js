import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BankServices from '../../BankService/BankServices';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { HttpStatusCode } from 'axios';
import AccountList from './AccountList';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function AccountListForm(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [accountType, setaccountType] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(props.user.branchId);
  const [list, setList] = useState([]);
  const history = useHistory();
  const [forSuspended, setforSuspended] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    if(!Authentication.checkAutherization('MANAGER',isLoggedIn,setIsLoggedIn))
    history.push('/employee_login');
  }, []);
  const handleaccountTypeChange = (event) => {
    const value = event.target.value;
    setaccountType(value);
  };
  const handleSubmit = async (event=null) => {
    if(event !==null)
    event.preventDefault();
    // You can perform actions based on the selected transaction type and values here
    console.log('accountType Type:', accountType);
    console.log('Selected Branch:', selectedBranch);
    if (accountType === 'all') {
      BankServices.getAllAccountsByBranchId(selectedBranch).then((obj) => displayMassage(obj));
      setforSuspended(false);
    }
    else if (accountType === 'closed') {

      BankServices.getAllCloseAccountsByBranchId(selectedBranch).then((obj) => displayMassage(obj));
       setforSuspended(false);
    }
    else if (accountType === 'active') {

      BankServices.getAllActiveAccountsByBranchId(selectedBranch).then((obj) => displayMassage(obj));
       setforSuspended(false);
    }
    else if (accountType === 'suspended') {

      BankServices.getAllSuspendedActiveAccountsByBranchId(selectedBranch).then((obj) => displayMassage(obj));
       setforSuspended(false);
    }
    else if (accountType === 'notUpdated') {

      BankServices.getAllAccountsTobeSuspended(selectedBranch).then((obj) => displayMassage(obj));
      setforSuspended(true); 
    }
    
  };
  function reRender()
  {
    console.log("successfully suspended !!");
    handleSubmit();
  }
  function displayMassage(obj) {
    const message = document.getElementById('message');
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {

      message.textContent = 'List of Accounts :- ';
      message.style.color = 'green';
     setList(obj.data);
     setRender(true);
    } else {
      setRender(false);
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
    }
  }

  return (
    <div className="bg_adduser">
      <div className="container d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="accountType" className='py-3'>
            <Form.Label>Account Holder Type</Form.Label>
            <Form.Control as="select" required value={accountType} onChange={handleaccountTypeChange}>
              <option value="">Select account Type</option>
              <option value="active">Active Accounts</option>
              <option value="suspended">Suspended Accounts</option>
              <option value="notUpdated">Not Updated from last 1 year</option>
              <option value="closed">Closed Account</option>
              <option value="all">All Accounts</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div id="message"></div>
        </Form>
      </div>
      {render === true && <AccountList list={list} isSuspend={forSuspended} renderHandler={reRender}/>}
    </div>
  );
}


export default AccountListForm;
