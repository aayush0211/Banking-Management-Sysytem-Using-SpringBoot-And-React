import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link,  useHistory,  useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function ViewProfile(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const history=useHistory();
  const location=useLocation();
  const [profile,setProfile]=useState({ 
   // image:location.state.image,
    id:props.user.id,
    firstName: props.user.firstName,
  lastName: props.user.lastName,
   mobileNumber: props.user.mobileNumber,
  dob: props.user.dob,
  gender: props.user.gender,
  email: props.user.email,
  street: props.user.street,
  city: props.user.city,
  state: props.user.state,
  country: props.user.country,
  zipCode: props.user.zipCode,
  cardNumber: props.user.cardNumber,
  createdOn: props.user.createdOn,
    location: props.user.location,
    branchId: props.user.branchId,
  branchName:props.user.branchName
 });
 useEffect(()=>{
  if(!Authentication.checkAutherization('MANAGER',isLoggedIn,setIsLoggedIn))
  history.push('/employee_login');
},[])
 
  return (
    
    <div className="bg_profile">
    <div className="container d-flex justify-content-center align-items-center">
      <div className="px-3 py-2">
        <h3 className="mt-3">Profile Details</h3>
        <hr/>
        <div id="message"></div>
        <Card.Body>
        {/* <Image src={URL.createObjectURL(profile.image)} roundedCircle style={{ width: '100px', height: '100px' }} /> */}
          <ListGroup variant="flush">
          <ListGroup.Item><strong>Employee Id:</strong> {profile.id}</ListGroup.Item>
          <ListGroup.Item>
                <strong>First Name:</strong> {profile.firstName} {" | "}
                <strong>Last Name:</strong> {profile.lastName} {" | "}
                <strong>Gender:</strong> {profile.gender}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {profile.email} {" | "}
                <strong>Date of Birth:</strong> {profile.dob}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mobile Number:</strong> {profile.mobileNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Branch Id:</strong> {profile.branchId}
                {" | "}
                <strong>Branch Name:</strong> {profile.branchName}
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
              <ListGroup.Item>
                <strong>CardNumber:</strong> {profile.cardNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Location:</strong> {profile.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>CreatedOn:</strong> {profile.createdOn}
              </ListGroup.Item>
            </ListGroup>
          
    </Card.Body>
    </div>
      </div>
    </div>
    
  );
}

export default ViewProfile;



