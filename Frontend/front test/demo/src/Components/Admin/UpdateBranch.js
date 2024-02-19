import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import BankServices from '../../BankService/BankServices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HttpStatusCode } from 'axios';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function UpdateBranch(props) {
    const { isLoggedIn, setIsLoggedIn } = useSession();
    const location = useLocation();

    const [branch, setBranch] = useState({ id: props.branch.id, branchName: props.branch.branchName, phoneNumber: props.branch.phoneNumber, street: props.branch.street, city: props.branch.city, state: props.branch.state, country: props.branch.country });
    const history = useHistory();
    const onsubmit = () => {

        console.log(branch.id + " " + branch.branchName + branch.phoneNumber + " " + branch.city + " " + branch.country + " " + branch.state + " " + branch.street);
        BankServices.updateBranch(branch).then((obj) => displayMassage(obj));
        setBranch({ id: '', branchName: '', phoneNumber: '', street: '', city: '', state: '', country: '' })

    }
    useEffect(() => {
        if (!Authentication.checkAutherization('ADMIN', isLoggedIn, setIsLoggedIn))
            history.push('/employee_login');
    }, [])

    function displayMassage(obj) {
        const message = document.getElementById('message');
        var bool = obj.status === HttpStatusCode.Ok ? true : false;
        if (bool) {
          //  message.textContent = 'Successfully updated !';
            message.style.color = 'green';
            alert(obj.data);
        } else {
            message.textContent = obj.response.data.message;
            message.style.color = 'red';
        }
    }

    return (
        <div className='bg_profile'>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="border rounded-5 px-3 m-2">
                    <Form>
                        <div id="message"></div>
                            <h2 className='mt-3'>Update Branch</h2>
                        <div className="d-flex flex-row m-3">
                            <Form.Group className="mb-3 px-1" >
                                <Form.Label>Branch Id</Form.Label>
                                <Form.Control type="text" readOnly disabled value={branch.id} placeholder="Branch Id" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Branch name</Form.Label>
                                <Form.Control type="text" value={branch.branchName} placeholder="Enter Branch Name" onChange={(event) => setBranch({ ...branch, branchName: event.target.value })} maxLength={10} minLength={3} required />

                            </Form.Group>
                        </div>
                        <div className="d-flex flex-row m-3">
                            <Form.Group className="mb-3 px-1" >
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control type="text" value={branch.phoneNumber} name='phoneNumber' placeholder="phoneNumber" onChange={(event) => setBranch({ ...branch, phoneNumber: event.target.value })} maxLength={12} required pattern='^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$' />
                            </Form.Group>

                            <Form.Group className="mb-3" >

                                <Form.Label>Street name</Form.Label>
                                <Form.Control type="text" value={branch.street} name='street' placeholder="Enter street Name" onChange={(event) => setBranch({ ...branch, street: event.target.value })} maxLength={30} minLength={3} required />

                            </Form.Group>
                        </div>
                        <div className="d-flex flex-row m-3">
                            <Form.Group className="mb-3 px-1" >
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" value={branch.city} name='city' placeholder="city" onChange={(event) => setBranch({ ...branch, city: event.target.value })} maxLength={10} minLength={3} required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>State name</Form.Label>
                                <Form.Control type="text" value={branch.state} name='state' placeholder="Enter state Name" onChange={(event) => setBranch({ ...branch, state: event.target.value })} maxLength={10} minLength={3} required />

                            </Form.Group>
                        </div>

                        <Form.Group className="mx-5 mb-2">
                            <Form.Label>Country Name</Form.Label>
                            <Form.Control type="text" value={branch.country} name='country' placeholder="country" onChange={(event) => setBranch({ ...branch, country: event.target.value })} maxLength={10} minLength={3} required />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={onsubmit}className='mb-3'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>

    )
}

export default UpdateBranch
