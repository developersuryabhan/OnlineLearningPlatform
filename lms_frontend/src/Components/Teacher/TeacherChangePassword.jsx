import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherChangePassword = () => {
    const [teacherData, setTeacherData] = useState({
        "password": ''
    });
    const teacherId = localStorage.getItem('teacherId');

    // Change Element Value
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    };  

    // SubmitForm
    const submitForm = async (event) => {
        event.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append('password', teacherData.password);
        try {
            const response = await axios.put(`${baseUrl}/teacher_change_password/${teacherId}/`, teacherFormData);
            if (response.status === 200) {
                window.location.href = '/teacher-logout';
            }else{ 
                alert('Oops... Same Error occured')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setTeacherData({
                status: 'error'
            });
        }
    };

    // Redirect if not logged in
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus !== 'true') {
        window.location.href = '/teacher-login';
    }

    useEffect(() => {
        document.title = 'Teacher | Change-Password';
    }, []);

    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar />
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header text-center">Change Password</h5>
                            <div className="card-body">
                                <form onSubmit={submitForm}>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                        <div className="col-sm-10">
                                            <input
                                                value={teacherData.password}
                                                onChange={handleChange}
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                id="inputPassword"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='d-grid'>
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default TeacherChangePassword;
