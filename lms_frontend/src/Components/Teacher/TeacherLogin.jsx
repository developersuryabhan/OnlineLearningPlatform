import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
        if (teacherLoginStatus === 'true') {
            navigate('/teacher-dashboard');
        }
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        name === 'email' ? setEmail(value) : setPassword(value);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/teacher_login/`, { email, password });
            if (response.data.bool) {
                localStorage.setItem('teacherLoginStatus', 'true');
                localStorage.setItem('teacherId', response.data.teacher_id);
                navigate('/teacher-dashboard');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        document.title = 'Teacher Login';
    }, []);

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center ">
                <div className="col-md-6 mt-5">
                    <div className="card shadow">
                        <div className="card-body bg-warning ">
                            <h5 className='card-title text-center mb-4 mt-2 fw-bold'>Teacher Login</h5>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={submitForm}>
                                <div className="form-group mt-3 fw-bold">
                                    <label htmlFor="email">Email</label>
                                    <input value={email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="email" name="email" />
                                </div>
                                <div className="form-group mt-3 fw-bold">
                                    <label htmlFor="password">Password</label>
                                    <input value={password} onChange={handleChange} type="password" className="form-control" id="password" name="password" />
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

export default TeacherLogin;
