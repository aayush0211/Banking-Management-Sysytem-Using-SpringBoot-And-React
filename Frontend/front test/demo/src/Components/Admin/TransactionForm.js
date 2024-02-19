import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BankServices from '../../BankService/BankServices';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { HttpStatusCode } from 'axios';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
import AdminTransactionList from './AdminTransactionList';
function TransactionForm() {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [transactionType, setTransactionType] = useState('');
  const [branchWise, setBranchWise] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch,setSelectedBranch]=useState('');
  const [list,setList]=useState([]);
  const history=useHistory();
  const [branches, setBranches] = useState([]);
  const [render,setRender]=useState(false);
 
  useEffect(() => {
   
      if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
      history.push('/employee_login');

    BankServices.getBranches().then((obj)=>displayMassage(obj,true));
  }, []);
  const handleTransactionTypeChange = (event) => {
    const value = event.target.value;
    setTransactionType(value);

    // Reset other state values when transaction type changes
    setSelectedDate('');
    setSelectedMonth('');
    setSelectedBranch('');
    setSelectedYear('');
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
     setRender(false);
    // You can perform actions based on the selected transaction type and values here
    console.log('Transaction Type:', transactionType);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Month:', selectedMonth);
    console.log('Selected Year:', selectedYear);
    console.log('Selected Brancg:', selectedBranch);
    console.log('Selected branchwise:', branchWise);
    if(transactionType === 'all')
  { 
   (branchWise==='branchwise') ? BankServices.getAllBranchWiseTransactions(selectedBranch).then((obj)=>displayMassage(obj)) :  BankServices.getAllTransactions().then((obj)=>displayMassage(obj));
   
  }
    else if(transactionType === 'date')
    {
      
     (branchWise==='branchwise') ?  BankServices.getDateWiseBranchWiseTransactions(selectedDate,selectedBranch).then((obj)=>displayMassage(obj)) : BankServices.getDateWiseTransactions(selectedDate).then((obj)=>displayMassage(obj));
    
    }
    else if(transactionType ==='monthly')
    {
      const parts = selectedMonth.split('-');
      (branchWise==='branchwise') ?  BankServices.getMonthlyBranchWiseTransactions(parts[1],parts[0],selectedBranch).then((obj)=>displayMassage(obj)) :  BankServices.getMonthlyTransactions(parts[1],parts[0]).then((obj)=>displayMassage(obj));
      
    }
    else if(transactionType ==='yearly')
    {
      
       (branchWise==='branchwise') ? BankServices.getYearlyBranchWiseTransactions(selectedYear,selectedBranch).then((obj)=>displayMassage(obj)) : BankServices.getYearlyTransactions(selectedYear).then((obj)=>displayMassage(obj));
      
    }
   
  };
  
  function displayMassage(obj,flag=false){
    const message = document.getElementById('message');
      var bool= obj.status===HttpStatusCode.Ok ? true:false;
      if (bool) {
      if(flag)//run for getallbranches
      {setBranches(obj.data)} 
      else //run for create new employee
      {
     // message.textContent = 'List of Transactions :- ';
      message.style.color = 'green';
    setRender(true);setList(obj.data);
      }
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
    }
  }
 
  return (
    <div className="bg_adduser">
    <div className="container d-flex justify-content-center align-items-center">
    
    <Form onSubmit={handleSubmit}>
    <div id="message"></div>
    <Form.Group controlId="transactionType" className='py-3'>
    <h4>Transaction Type</h4>
        <Form.Control as="select" required value={transactionType} onChange={handleTransactionTypeChange}>
        <option value="">Select Transaction Type</option>
        <option value="date">Date Wise Transactions</option>
        <option value="monthly">Monthly Transactions</option>
        <option value="yearly">Yearly Transactions</option>
          <option value="all">All Transactions</option>
          </Form.Control>
      </Form.Group>
      {transactionType === 'date' && (
        <Form.Group controlId="selectedDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date"  max={new Date().toISOString().split('T')[0]}  required value={selectedDate} onChange={handleDateChange} />
          </Form.Group>
       
          )}
    {transactionType === 'monthly' && (
      <Form.Group controlId="selectedMonth">
      <Form.Label>Month</Form.Label>
          <Form.Control type="month" max={new Date().toISOString().split('-').slice(0, 2).join('-')} required value={selectedMonth} onChange={handleMonthChange} />
          </Form.Group>
      )}
       {transactionType === 'yearly' && (
      <Form.Group controlId="selectedYear">
      <Form.Label>Year</Form.Label>
      <Form.Control type="number" min="2020" max="2024" step="1" required value={selectedYear} onChange={handleYearChange} />
    </Form.Group>
      )}
      <div class="form-group">
       
      <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name={branchWise} id="branchwise" onClick={(e)=>setBranchWise(e.target.value)} value="branchwise"/>
          <label class="form-check-label" for="branchwise">Branchwise Transactions</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" defaultChecked type="radio" name={branchWise} onClick={(e)=>setBranchWise(e.target.value)}  id="all" value=""/>
          <label class="form-check-label" for="all">All Branch Transactions</label>
          </div>
      </div>
      {branchWise ==='branchwise' &&
      <Form.Group className="mb-3" controlId="branchId">
        <Form.Label>Branch</Form.Label>
        <Form.Control
          as="select"
          name="branchId"
          value={selectedBranch}
          onChange={(e)=>setSelectedBranch(e.target.value)}
          required
          >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
            {branch.branchName}
            </option>
            ))}
            </Form.Control>
            </Form.Group> }
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
      </div>
      {render===true &&<AdminTransactionList list={list}/> } 
      </div>
      );
    }
  
    
export default TransactionForm;
