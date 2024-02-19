import React, { useState } from "react";
import BankServices from "../../BankService/BankServices";
import { HttpStatusCode } from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSession } from "../../Security/SessionContext";

const EmployeeLoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const { item, setItem } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending the email and password to your server for authentication

    console.log("Submitted:", { email, password });
    BankServices.employeeLogin({ email: email, password: password }).then(
      (obj) => displayMassage(obj)
    );
    console.log("in emp login" + isLoggedIn);
  };
  function displayMassage(obj) {
    const message = document.getElementById("message");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      message.textContent = "Successfully login !";
      message.style.color = "green";
      setItem(obj.data.id);
      setIsLoggedIn(true);
      if (obj.data.role === "ADMIN") history.push("/admin/welcome");
      else if (obj.data.role === "MANAGER") history.push("/employee/welcome");
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }
  return (
    <div className="bg_profile">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Employee Login</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h5 id="message"></h5>
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
                  <button type="submit" className="btn btn-primary btn-block mt-2">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginForm;
// @NotBlank(message = "Email can't be blank")
// @Email(message = "Invalid email format")
// private String email;
// //	@NotBlank
//  @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
// @Length(min = 3,max=20,message = "Invalid password length")
// private String password;
