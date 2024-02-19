import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function ViewProfile(props) {
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [profile, setProfile] = useState({
    image: props.user.image,
    id: props.user.id,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    imageUrl: props.user.imageUrl,
    mobileNumber: props.user.mobileNumber,
    dob: props.user.dob,
    gender: props.user.gender,
    phoneNo: props.user.phoneNo,
    email: props.user.email,
    branchName: props.user.branchName,
    branchId: props.user.branchId,
    street: props.user.street,
    city: props.user.city,
    state: props.user.state,
    country: props.user.country,
    zipCode: props.user.zipCode
  });
  useEffect(() => {
    if (!Authentication.checkAutherization('ADMIN', isLoggedIn, setIsLoggedIn))
      history.push('/employee_login');
  }, [])

  return (
    <div className="bg_profile">
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="px-3 py-2">
          <h3 className="mt-3">Profile Details</h3>
          <hr/>
          <div id="message"></div>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Employee Id:</strong> {profile.id}</ListGroup.Item>
              <ListGroup.Item><strong>First Name:</strong> {profile.firstName}{" | "}
              <strong>Last Name:</strong> {profile.lastName}{" | "}
              <strong>Gender:</strong> {profile.gender}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {profile.email}</ListGroup.Item>
              <ListGroup.Item><strong>Date of Birth:</strong> {profile.dob}</ListGroup.Item>
              <ListGroup.Item><strong>Mobile Number:</strong> {profile.mobileNumber}</ListGroup.Item>
              <ListGroup.Item><strong>Street:</strong> {profile.street}{" | "}
              <strong>City:</strong> {profile.city}</ListGroup.Item>
              <ListGroup.Item><strong>State:</strong> {profile.state}{" | "}
              <strong>Country:</strong> {profile.country}</ListGroup.Item>
              <ListGroup.Item><strong>ZipCode:</strong> {profile.zipCode}</ListGroup.Item>
            </ListGroup>

          </Card.Body>
        </div>{" "}
      </div>
    </div>

  );
}

export default ViewProfile;



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