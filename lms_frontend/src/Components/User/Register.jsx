import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api/student/';

const Register = () => {
    const [studentData, setStudentData] = useState({
        "full_name": '',
        "email": '',
        "username": '',
        "password": '',
        "address": '',
        "interested_categories": '',
        "status": ''
    });
    // Change Element Value
    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    };
    // End

    // SubmitForm
    const submitForm = async (event) => {
        event.preventDefault();
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("username", studentData.username)
        studentFormData.append("password", studentData.password)
        studentFormData.append("address", studentData.address)
        studentFormData.append("interested_categories", studentData.interested_categories)

        try {
            const response = await axios.post(baseUrl, studentData);
            // console.log(response)
            if (response.status === 201) {
                setStudentData({
                    "full_name": '',
                    "email": '',
                    "username": '',
                    "password": '',
                    "address": '',
                    "interested_categories": '',
                    "status": 'success'
                })
            }
            console.log(studentData)
            window.location.href = '/student-login';
        } catch (error) {
            console.error('Error submitting form:', error);
            setStudentData({ ...studentData, status: 'error' });

        }
    }

    useEffect(() => {
        document.title = 'Student Register';
    }, []);
    return (
        <>
        <div className='container-fluid bg-light min-vh-100 mt-5 align-items-center justify-content-center'>
             <div className="row justify-content-center">
                 <div className="col-md-8 col-lg-4">
                     {studentData.status === 'success' && <div className='alert alert-success text-center'>Thanks for your registration</div>}
                     {studentData.status === 'error' && <div className='alert alert-danger text-center'>Something went wrong. Please try again</div>}
                         <div className="card-body bg-warning p-4">
                             <div className="card-header  ">
                                 <h5 className='m-0 text-center fw-bold'>Student Register</h5>
                             <form>
                                    <div className="mb-3">
                                        <label htmlFor="full_name" className="form-label fw-bold">Full Nmae</label>
                                        <input value={studentData.full_name} type="text" id="full_name" name='full_name' onChange={handleChange} className="form-control" aria-describedby="full_name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                                        <input value={studentData.email} type="email" id="email" name='email' onChange={handleChange} className="form-control" aria-describedby="email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-bold">User Name</label>
                                        <input value={studentData.username} type="text" id="username" name='username' onChange={handleChange} className="form-control" aria-describedby="username" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                                        <input value={studentData.password} type="password" id="password" name='password' onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                                        <input value={studentData.address} type="address" id="address" name='address' onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="interested_categories" className="form-label fw-bold">Interests </label>
                                        <textarea value={studentData.interested_categories} id="interested_categories" onChange={handleChange} className=' form-control' name='interested_categories' rows="1" cols="50"></textarea>
                                        <div className="form-text fw-bold">PHP, Pyhton,javaScript</div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button type="submit" onClick={submitForm} className="btn btn-success w-100">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
