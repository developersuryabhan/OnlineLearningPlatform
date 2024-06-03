import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const Login = () => {
    const [studentLoginData, setStudentLoginData] = useState({
        email: '',
        password: ''
    });

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const studentFormData = new FormData();
        studentFormData.append('email', studentLoginData.email)
        studentFormData.append('password', studentLoginData.password)
        try {
            axios.post(`${baseUrl}/student_login/`, studentFormData)
                .then((res) => {
                    if (res.data.bool === true) {
                        localStorage.setItem('studentLoginStatus', true)
                        localStorage.setItem('studentId', res.data.student_id)
                        window.location.href = '/student-dashboard';
                    } else {
                        seterrorMsg('Invalid email or password!!')
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
        window.location.href = '/student-dashboard';
    }

    useEffect(() => {
        document.title = 'Student Login';
    }, []);

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center ">
                <div className="col-md-6 mt-5">
                    <div className="card shadow">
                        <div className="card-body bg-warning ">
                            <h5 className='card-title text-center mb-4 mt-2'>Student Login</h5>
                            {errorMsg && <p className="text-danger fw-bold">{errorMsg}</p>}
                            <form onSubmit={submitForm}>
                                <div className="form-group mt-3 fw-bold">
                                    <label htmlFor="email">Email</label>
                                    <input value={studentLoginData.email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="email" name="email" />
                                </div>
                                <div className="form-group mt-3 fw-bold">
                                    <label htmlFor="password">Password</label>
                                    <input value={studentLoginData.password} onChange={handleChange} type="password" className="form-control" id="password" name="password" />
                                </div>
                                <div className='text-center mt-4'>
                                    <button type="submit" className='btn btn-success btn-lg w-100'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
