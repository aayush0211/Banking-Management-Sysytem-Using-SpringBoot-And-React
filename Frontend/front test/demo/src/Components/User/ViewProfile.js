import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { useSession } from "../../Security/SessionContext";
import Authentication from "../../Security/SessionContext";
function ViewProfile(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const history = useHistory();
  const location = useLocation();
  //   const [profile,setProfile]=useState({
  //     image:location.state.image,
  //     id:location.state.id,
  //     firstName: location.state.firstName,
  //   lastName: location.state.lastName,
  //   imageUrl:location.state.imageUrl,
  //   dob: location.state.dob,
  //   gender: location.state.gender,
  //   mobileNumber:location.state.mobileNumber,
  //   email: location.state.email,
  //   password: location.state.password,
  //   confirmPassword: location.state.password,
  //   branchName:location.state.branchName,
  //   branchId: location.state.branchId,
  //   street: location.state.street,
  //   city: location.state.city,
  //   state: location.state.state,
  //   country: location.state.country,
  //   zipCode: location.state.zipCode,
  //   cardNumber: location.state.cardNumber,
  //   createdOn: location.state.createdOn,
  //   location: location.state.location,
  //  });
  const [profile, setProfile] = useState(props.user);
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");
  }, []);

  return (
    <div className="bg_profile">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5 px-3 py-2">
          <h3 className="mt-3">Profile Details</h3>

          <div id="message"></div>
          <Card.Body>
            {/* <Image src={URL.createObjectURL(profile.image)} roundedCircle style={{ width: '100px', height: '100px' }} /> */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Account Id:</strong> {profile.id}
              </ListGroup.Item>
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
          {/* <Link to={{pathname:'/user/UpdateProfile',state:profile}}>
    <Button variant="primary" type="button">
        Update Profile
      </Button></Link> */}
          {/* <Link to='/user/welcome'>
    <Button variant="primary" type="button">
        Back to Home
      </Button></Link> */}
        </div>{" "}
      </div>
    </div>
  );
}

export default ViewProfile;

// {
//     "id": 4,
//     "firstName": "Aayush",
//     "lastName": "Kumar",
//     "mobileNumber": "09084528153",
//     "dob": "2000-06-06",
//     "gender": "male",
//     "email": "aayushfeb2000@gmail.com",
//     "password": "$2a$10$mwL5cgLFPNY6rn4Zh48D6eqnybJUmyKbnilyZhmTgqyTvjZEW3r1.",
//     "balance": 5000.0,
//     "accountType": "SAVING",
//     "branchId": 2,
//     "branchName": "pune",
//     "creationDate": "2024-02-16",
//     "status": "ACTIVE",
//     "updateDate": "2024-02-16",
//     "street": "Aayush Bhawan near Mehi Ashram",
//     "city": "Purnea",
//     "state": "Bihar",
//     "country": "India",
//     "zipCode": null,
//     "image": null
// }