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
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card border-2 shadow">
                        <h5 className='card-header text-bg-info text-center m-4'>Student Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                           <form  onSubmit={submitForm} action="">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input value={studentLoginData.email} onChange={handleChange} type="email" name="email" id="email" className="form-control"  aria-describedby="email"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input value={studentLoginData.password} onChange={handleChange} type="password" id="password" name="password" className="form-control"  />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className='btn btn-success'>Login</button>
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



