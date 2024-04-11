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
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card border-2 shadow">
                        <h5 className='card-header text-bg-info text-center m-4'>Teacher Login</h5>
                        <div className="card-body">
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input value={email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="email" name="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input value={password} onChange={handleChange} type="password" className="form-control" id="password" name="password" />
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

export default TeacherLogin;



