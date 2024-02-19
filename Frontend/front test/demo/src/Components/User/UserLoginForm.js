import React, { useEffect, useState } from 'react';
import BankServices from '../../BankService/BankServices';
import { HttpStatusCode } from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSession } from '../../Security/SessionContext';
import Authentication from "../../Security/SessionContext"
const UserLoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history=useHistory();
const { item, setItem } = useSession();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending the email and password to your server for authentication
    console.log('Submitted:', { email, password });
    BankServices.userLogin({email:email,password:password}).then((obj)=>displayMassage(obj));
  }
  function displayMassage(obj) {
    const message = document.getElementById("message");
    var bool=obj.status===HttpStatusCode.Ok ? true:false;
    if (bool) {
      //message.textContent = "Successfully login !";
      message.style.color = "green";
      setIsLoggedIn(true);
      setItem(obj.data.id);
    if( obj.data.role==='USER')
      history.push("/user/welcome");
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }
  return (
    <div className="bg_profile">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">User Login</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h1 id="message"></h1>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-2"
                  >
                    Login
                  </button>
                </form>
                <Link to="/addUser">
                  <button
                    type="button"
                    className="btn btn-primary btn-block mt-2"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserLoginForm;
// @NotBlank(message = "Email can't be blank")
// @Email(message = "Invalid email format")
// private String email;
// //	@NotBlank
//  @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
// @Length(min = 3,max=20,message = "Invalid password length")
// private String password;