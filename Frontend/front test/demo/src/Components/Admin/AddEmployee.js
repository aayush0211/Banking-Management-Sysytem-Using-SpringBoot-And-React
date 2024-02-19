import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BankServices from "../../BankService/BankServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HttpStatusCode } from "axios";
import Authentication from '../../Security/SessionContext';
import "./style.css";
import { useSession } from "../../Security/SessionContext";
function AddEmployee(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    image: null,
    branchId: props.branch.id,
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    createdOn: "",
    location: "",
    role:'MANAGER'
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const history = useHistory();
  useEffect(() => {
      if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
      history.push('/employee_login');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlePhotoChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
    setPreviewPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    if (!validateAge(formData.dob)) {
      alert("age must be greater than 21 years");
      return;
    }
    if (!checkPasswordMatch()) {
      alert("confirm password don't match!!!");
      return;
    }
    console.log(formData);
    // history.push("/admin/ViewProfile",formData);
    BankServices.addEmployee(formData).then((obj) => displayMassage(obj));
    setFormData({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      image: null,
      branchId: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      cardNumber: "",
    createdOn: "",
    location: "",
    });
    setPreviewPhoto(null);
  };

  function validateAge(birthdate) {
    // Convert birthdate string to a Date object
    const dob = new Date(birthdate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const ageDifference = currentDate - dob;

    // Convert milliseconds to years
    const yearsDifference = ageDifference / (1000 * 60 * 60 * 24 * 365.25);

    // Check if the person is at least 16 years old
    return yearsDifference >= 21;
  }

  function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("password-match-message");

    if (password === confirmPassword) {
      message.textContent = "Password match";
      message.style.color = "green";
      return true;
    } else {
      message.textContent = "Password does not match";
      message.style.color = "red";
      return false;
    }
  }
  function displayMassage(obj) {
    const message = document.getElementById('message');
      var bool = obj.status === HttpStatusCode.Created ? true : false;
    if (bool) {
      
       // message.textContent = 'Successfully added !';
        message.style.color = 'green';
        alert(obj.data);
        props.defaultRenderHandler();
      
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
      console.log(obj.response.data.message);
    }
  }

  return (
    <div className="bg_adduser">

      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5 m-4 px-3 py-5">
          <Form
            onSubmit={handleSubmit}
            className=""
          ><h3>Add Manager</h3>
            <div id="message"></div>
            {/* <div className="d-flex justify-content-center">
              <Form.Group controlId="photo">
                <Form.Label>Photo</Form.Label>
                {previewPhoto && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={previewPhoto}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: 3
                      }}
                    />
                  </div>
                )}
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
              </Form.Group>
            </div> */}
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  maxLength={30}
                  minLength={3}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  maxLength={30}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 px-1" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="d-flex flex-row px-3">
              <Form.Group className="mb-3 px-1" controlId="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Mob no."
                  name="mobileNumber"
                  maxLength={12}
                  pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

            </div>
            <div className="d-flex flex-row px-3">
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

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  placeholder="Enter password"
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
            <hr />
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="cardNumber">
                <Form.Label>Addhar Card No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Addhar no."
                  pattern="^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  maxLength={30}
                  minLength={3}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 px-1" controlId="createdOn">
                <Form.Label>Date of createdOn</Form.Label>
                <Form.Control
                  type="date"
                  name="createdOn"
                  max={Date.now()}
                  value={formData.createdOn}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <hr />
            <div className="d-flex flex-row px-3">

              <Form.Group className="mb-3" controlId="Street">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street"
                  maxLength={30}
                  minLength={3}
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="city">
                <Form.Label>City Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  maxLength={10}
                  minLength={3}
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="state">
                <Form.Label>State Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  name="state"
                  maxLength={10}
                  minLength={3}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row px-3">

              <Form.Group className="mb-3 px-1" controlId="country">
                <Form.Label>Country Name</Form.Label>
                <Form.Control
                  id="password"
                  placeholder="Enter country"
                  type="text"
                  name="country"
                  maxLength={10}
                  minLength={3}
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="zipCode">
                <Form.Label>ZipCode</Form.Label>
                <Form.Control
                  id="zipCode"
                  placeholder="Enter zipcode"
                  type="text"
                  name="zipCode"
                  Pattern="^\\d{6}(?:[-\\s]\\d{4})?$"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="px-3 m-2">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;

// @NotBlank(message = "First name data must be required")
// @Length(max = 30,min = 3)
// private String firstName;
// @Length(max = 30)
// private String lastName;
// @NotBlank(message = "phone number data must be required")
// @Length(max = 12)
// private String mobileNumber;
// @DateTimeFormat(pattern = "dd/MM/yyyy")
// @NotNull
// @Past(message = "Date of Birth must be in the past")
// @AgeConstraint(value = 16, message = "Sorry!! You must be
// atleast 16 years old")
// private LocalDate dob;
// @NotBlank(message = "Gender must required")
// private String gender;
// @Email
// @NotBlank
// private String email;
// @Pattern(regexp =
// "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// ")
// private String password;
// @NotNull
// private long branchId;
