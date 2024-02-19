import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import "../../Style/Form_flexBox.css";
function AddUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    balance: "",
    accountType: "",
    branchId: "",
    creationDate: "",
    updateDate: "",
    cardNumber: "",
    createdOn: "",
    location: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode :'',
    role: "USER",
  });

  const [branches, setBranches] = useState([]);
  const [accountTypes] = useState(["SAVING", "CURRENT"]);
  const history = useHistory();

  useEffect(() => {
    // Fetch branch data from backend or use mock data
    // const mockBranches=await BankServices.getBranches();
    BankServices.getBranches().then((obj) => displayMassage(obj, true));
  }, []);

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
    if (!validateAge(formData.dob)) {
      alert("age must be greater than 16 years");
      return;
    }
    if (!checkPasswordMatch()) {
      alert("confirm password don't match!!!");
      return;
    }
    console.log(formData);
    BankServices.addUser(formData).then((obj) => displayMassage(obj));
    setFormData({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      balance: "",
      accountType: "",
      branchId: "",
      creationDate: "",
      updateDate: "",
      cardNumber: "",
      createdOn: "",
      location: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode:''
    });
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
    return yearsDifference >= 16;
  }

  const dateformatconvert = (dob) => {
    const originalDate = dob;
    const parts = originalDate.split("-");
    const rearrangedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    console.log(rearrangedDate + " " + originalDate);

    return rearrangedDate;
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
  function displayMassage(obj, flag = false) {
    const message = document.getElementById("messageau");
    if (!flag) var bool = obj.status === HttpStatusCode.Created ? true : false;
    else var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      if (flag) {
        setBranches(obj.data);
        return;
      }
      message.textContent = "Successfully added !";
      message.style.color = "green";
      alert(obj.data);
      history.push("/user_login");
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_branchlist">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5">
          <Form onSubmit={handleSubmit}>
            <h3 className="mt-2">Registration Form</h3>
            <div id="messageau"></div>
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

              <Form.Group className="mb-3" controlId="lastName">
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

              <Form.Group className="mb-3 px-1" controlId="mobileNumber">
                <Form.Label>Mobile No</Form.Label>
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
            </div>
            <div className="d-flex flex-row m-3">
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
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="branchId">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  as="select"
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
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

              <Form.Group className="mb-3" controlId="accountType">
                <Form.Label>Account Type</Form.Label>
                <Form.Control
                  as="select"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select accountType</option>
                  {accountTypes.map((accountType) => (
                    <option key={accountType} value={accountType}>
                      {accountType}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 px-1" controlId="balance">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Balance"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
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
            <h3>Aadhar Card Section :- </h3>
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="cardNumber">
                <Form.Label>Addhar Card Number</Form.Label>
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
            <h3>Address Section :- </h3>
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="Street">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street name"
                  maxLength={30}
                  minLength={3}
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city name"
                  name="city"
                  maxLength={10}
                  minLength={3}
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="state">
                <Form.Label>State Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state name"
                  name="state"
                  maxLength={10}
                  minLength={3}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="country">
                <Form.Label>Country Name</Form.Label>
                <Form.Control
                  id="password"
                  placeholder="Enter country name"
                  type="text"
                  name="country"
                  maxLength={10}
                  minLength={3}
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="ZipCode">
                <Form.Label>ZipCode</Form.Label>
                <Form.Control
                  id="ZipCode"
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
            <Link to="/">
              <Button variant="primary" type="button">
                Back
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;

// @NotBlank(message  = "Must be filled")
// 	@Pattern(regexp = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")
// 	private String cardNumber;
// 	@NotBlank(message = "Location as per aadhar card")
// 	private String location;
// 	@NotNull
// 	@Past(message = "Aadhar card must be created in past")
// 	private LocalDate createdOn;

// @NotBlank(message = "First name data must be required")
//  @Length(max = 30,min = 3)
//  private String firstName;
//  @Length(max = 30)
//  private String lastName;
//  @NotBlank(message = "phone number data must be required")
//  @Length(max = 12)
//  private String mobileNumber;
//  @DateTimeFormat(pattern = "dd/MM/yyyy")
//  @NotNull
//  @Past(message = "Date of Birth must be in the past")
//  @AgeConstraint(value = 16, message = "Sorry!! You must be
//  atleast 16 years old")
//  private LocalDate dob;
//  @NotBlank(message = "Gender must required")
//  private String gender;
//  @Email
//  @NotBlank
//  private String email;
// @Pattern(regexp =
//  "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
//  ")
//  private String password;
//  private double balance;
//  @NotBlank(message = "Account type should not be left
//  blank")
//  private String accountType;
//  @NotNull
//  private long branchId;
//  @NotNull(message = "creation date should not be null")
//  @DateTimeFormat(pattern = "dd/MM/yyyy")
//  private LocalDate creationDate;
//  private LocalDate updateDate

//  @NotBlank(message = "street data must be required")
//  @Length(max = 30,min = 3)
//    private String street;
//  @NotBlank(message = "city data must be required")
//  @Length(max = 10,min = 3)
//    private String city;
//  @NotBlank(message = "state data must be required")
//  @Length(max = 10,min = 3)
//    private String state;
//  @NotBlank(message = "country data must be required")
//  @Length(max = 10,min = 3)
//    private String country;
//  @NotBlank
//  @Pattern(regexp = "^\\d{6}(?:[-\\s]\\d{4})?$")
//  private String zipCode;
