import React, {  useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BankServices from '../../BankService/BankServices';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { HttpStatusCode } from 'axios';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function DeleteProfile(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  
  const history = useHistory();
  const [profile, setProfile] = useState(props.user);
  useEffect(()=>{
    if(!Authentication.checkAutherization('USER',isLoggedIn,setIsLoggedIn))
    history.push('/user_login');
},[])
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    BankServices.deleteUser(profile.id).then((obj) => displayMassage(obj));
    console.log(profile);

  };

  function displayMassage(obj) {
    const message = document.getElementById('messagedp');
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      message.textContent = 'Successfully delete !';
      message.style.color = 'green';
      alert(obj.data);
      setIsLoggedIn(false);
      props.defaultRenderHandler();
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
            <Card.Header>Profile Details</Card.Header>
            <div id="messagedp"></div>
            <Card.Body>
              {/* <Image src={profile.image} roundedCircle style={{ width: '100px', height: '100px' }} /> */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Account Id:</strong> {profile.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Branch Id:</strong> {profile.branchId} {" | "}
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
              <Form onSubmit={ handleSubmit }>
                <Form.Check
                  type="checkbox"
                  label="Are you sure to delete employee ?"
                  id="checkboxId"
                  required
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="p-1"
                >
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

export default DeleteProfile;



