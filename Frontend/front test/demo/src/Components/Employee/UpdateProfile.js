import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import Authentication, { useSession } from "../../Security/SessionContext";
function UpdateProfile(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const location = useLocation();
  const [formData, setFormData] = useState({
    // image:props.state.image,
    id: props.user.id,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    mobileNumber: props.user.mobileNumber,
    dob: props.user.dob,
    gender: props.user.gender,
    phoneNo: props.user.phoneNo,
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
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    if (
      !Authentication.checkAutherization("MANAGER", isLoggedIn, setIsLoggedIn)
    )
      history.push("/employee_login");
    // setPreviewPhoto(URL.createObjectURL(formData.image));
  }, []);
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlePhotoChange = (event) => {
    setFormData({ ...formData, photo: event.target.files[0] });
    setPreviewPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    if (!validateAge(formData.dob)) {
      alert("age must be greater than 21 years");
      return;
    }
    console.log(formData);

    BankServices.updateEmployee(formData).then((obj) => displayMassage(obj));
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

  function displayMassage(obj) {
    const message = document.getElementById("message");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      message.textContent = "Successfully updated !";
      message.style.color = "green";
      alert(obj.data);
      props.defaultRenderHandler();
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_updateprofile">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5 m-2 px-3">
          <h2 className="mt-2">Update Profile</h2>
          <Form
            onSubmit={handleSubmit}
            className="
    "
          >
            <div id="message"></div>
            {/* <Form.Group controlId="photo">
        <Form.Label>Photo</Form.Label>
       {previewPhoto && <div style={{ marginTop: '10px' }}><img src={previewPhoto} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} /></div>}
        <Form.Control type="file"  name="photo" onChange={handlePhotoChange} accept="image/*"/>
      </Form.Group> */}
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3 px-1" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
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
              <Form.Group cclassName="mb-3 px-1" controlId="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
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
                  max={Date.now()}
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 px-1" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

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

            <div className="d-flex flex-row px-3">
              <Form.Group className="mb-3 px-1" controlId="Street">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  type="text"
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
              SAVE
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
