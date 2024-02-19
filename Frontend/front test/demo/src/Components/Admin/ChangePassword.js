import { HttpStatusCode } from 'axios';
import React, { useState } from 'react'
import BankServices from '../../BankService/BankServices';

function ChangePassword(props) {
    const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
 

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
      };
      const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, like sending the email and password to your server for authentication
        console.log('Submitted:'+ oldPassword+ newPassword );
        if(!checkPasswordMatch()) return;
        BankServices.AdminUpdatePassword(props.user.id,{email:props.user.email,password:oldPassword,newPassword:newPassword}).then((obj)=>displayMassage(obj));
      }
      function displayMassage(obj) {
        const message = document.getElementById("message");
        var bool=obj.status===HttpStatusCode.Ok ? true:false;
        if (bool) {
          message.textContent = obj.data;
          message.style.color = "green";
        } else {
          message.textContent = obj.response.data.message;
          message.style.color = "red";
        }
      }
      function checkPasswordMatch() {
        const password = document.getElementById("newPassword").value;
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
  return (
    <div className='bg_profile'>
      <div className="container">
        <div className="px-3 py-2">
      <div className="row justify-content-center">
      <div id="message"></div>
        <div className="col-md-8">
        <h2>Change Password</h2>
              <hr />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <h1 id='message'></h1>
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Enter oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                    placeholder="Enter newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                    id="confirm-password"
                    placeholder="Enter newPassword"
                    required
                  />
                  <div id="password-match-message"></div>
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block mt-2">Change Password</button>
              </form>
            </div>
          
        </div>
      </div>
    </div>
    </div>
    </div>

  )
}

export default ChangePassword;
