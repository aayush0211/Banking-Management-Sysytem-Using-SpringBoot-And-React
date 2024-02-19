import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../../Style/Form_flexBox.css";
import { HttpStatusCode } from "axios";
function EmailTransaction(props) {
  const [formData, setFormData] = useState({
    transactionType:"",
    transactionDate:new Date().toDateString(),
    amount:"",
    accountNo:"",
    receiverAccountNo:"",
    email:'',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    if(props.email!==formData.email)
    { displayMassage(false); return; }displayMassage(true);
    if(!checkPasswordMatch()) return;
   props.transactionHandler(formData);

    setFormData({
      transactionType:"",
      transactionDate:new Date().toDateString(),
      amount:"",
      accountNo:"",
      receiverAccountNo:"",
      email:'',
      password:''
    });
  };
  function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("password-match-message");

    if (password === confirmPassword) {
      message.textContent = "Passwords match";
      message.style.color = "green";
      return true;
    } else {
      message.textContent = "Passwords do not match";
      message.style.color = "red";
      return false;
    }
  }
  function displayMassage(bool) {
    const message = document.getElementById('email_error');
    if (bool) {

      message.textContent = 'Email Verified';
      message.style.color = 'green';
    } else {
      message.textContent = "Invalid Email";
      message.style.color = 'red';
    }
  }

  return (
    // <div className="bg_cardtransaction">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5 px-3 py-2">
          <Form onSubmit={handleSubmit}>
            <h3 className="mt-2">Enter Your Email and Transaction Details</h3>
           
            <div className="d-flex flex-row m-3">     
              <Form.Group className="mb-3 px-1" controlId="accountNo">
                <Form.Label>Account No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter accountNo"
                  name="accountNo"
                
                  min={1}
                  value={formData.accountNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
               
              <Form.Group className="mb-3 px-1" controlId="receiverAccountNo">
                <Form.Label>Receiver Account No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter receiverAccountNo"
                  name="receiverAccountNo"
                  min={1}
                  value={formData.receiverAccountNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row m-3 justify-content-center">     
              <Form.Group className="mb-3 px-1" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  name="amount"
                  max={50000}
                  min={1}
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
           
            <div id="email_error"></div> 
            
              <Form.Group className="mb-3 px-1" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </div>
              <div className="d-flex flex-row m-3"> 
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  placeholder="Enter passsword"
                  type="password"
                  name="password"
                  pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  id="confirm-password"
                  placeholder="Enter password again"
                  type="password"
                  name="confirm_password"
                  pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                  required
                  onInput={checkPasswordMatch}
                  title="Passwords must be at least 8 characters long"
                />
                <div id="password-match-message"></div>
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="px-3 m-2">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    // </div>
  );
}

export default EmailTransaction;

