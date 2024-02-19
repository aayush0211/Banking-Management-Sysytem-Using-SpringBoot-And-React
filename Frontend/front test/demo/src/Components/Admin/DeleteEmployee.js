import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BankServices from '../../BankService/BankServices';
import {  useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { HttpStatusCode } from 'axios';
import Authentication from '../../Security/SessionContext';
import { useSession } from '../../Security/SessionContext';

function DeleteEmployee(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const history = useHistory();
  const [profile, setProfile] = useState({
    id: props.user.id,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    image: props.user.image,
    mobileNumber: props.user.mobileNumber,
    dob: props.user.dob,
    gender: props.user.gender,
    email: props.user.email,
    branchName: props.user.branchName,
    branchId: props.user.branchId,
    street: props.user.street,
    city: props.user.city,
    state: props.user.state,
    country: props.user.country,
    zipCode: props.user.zipCode
  });
  useEffect(()=>{
    if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
    history.push('/employee_login');
},[])
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    BankServices.deleteEmployees(profile.id).then((obj) => displayMassage(obj));
    console.log(profile);

  };

  function displayMassage(obj) {
    const message = document.getElementById('messagedp');
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
     // message.textContent = 'Successfully delete !';
      message.style.color = 'green';
      alert(obj.data);
      props.deleteEmployeeHandler(obj,true);
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = 'red';
    }
  }


  return (
    <div className="bg_updateprofile">
      <div className="container d-flex justify-content-center align-items-center">
        <div className=" m-2 px-3">
          <Card>
            <h3>Delete Manager</h3>
            <Card.Header>Profile Details</Card.Header>
            <div id="messagedp"></div>
            <Card.Body>
              {/* <Image src={profile.image} roundedCircle style={{ width: '100px', height: '100px' }} /> */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Employee Id:</strong> {profile.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Branch Id:</strong> {profile.branchId}
                  {" | "}
                  <strong>Branch Name:</strong> {profile.branchName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>First Name:</strong> {profile.firstName}
                  {" | "}
                  <strong>Last Name:</strong> {profile.lastName}
                  {" | "}
                  <strong>Gender:</strong> {profile.gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {profile.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date of Birth:</strong> {profile.dob}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Mobile Number:</strong> {profile.mobileNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Street:</strong> {profile.street}
                  {" | "}
                  <strong>City:</strong> {profile.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>State:</strong> {profile.state}
                  {" | "}
                  <strong>Country:</strong> {profile.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>ZipCode:</strong> {profile.zipCode}
                </ListGroup.Item>
              </ListGroup>
              <Form onSubmit={handleSubmit}>
                <Form.Check
                  type="checkbox"
                  label="Are you sure to delete employee ?"
                  id="checkboxId"
                  required
                />
                <Button variant="primary" type="submit">
                  Delete Employee
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmployee;



// // @NotBlank(message = "First name data must be required")
// // @Length(max = 30,min = 3)
// // private String firstName;
// // @Length(max = 30)
// // private String lastName;
// // @NotBlank(message = "phone number data must be required")
// // @Length(max = 12)
// // private String mobileNumber;
// // @DateTimeFormat(pattern = "dd/MM/yyyy")
// // @NotNull
// // @Past(message = "Date of Birth must be in the past")
// // @AgeConstraint(value = 16, message = "Sorry!! You must be
// // atleast 16 years old")
// // private LocalDate dob;
// // @NotBlank(message = "Gender must required")
// // private String gender;
// // @Email
// // @NotBlank
// // private String email;
// // @Pattern(regexp =
// // "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// // ")
// // private String password;
// // @NotNull
// // private long branchId;