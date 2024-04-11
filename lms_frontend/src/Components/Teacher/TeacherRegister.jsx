import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

const TeacherRegister = () => {
    const [teacherData, setTeacherData] = useState({
        "full_name": '',
        "email": '',
        "password": '',
        "qualification": '',
        "mobile_no": '',
        "skills": '',
        "status": ''
    });

    // Change Element Value
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    };
    // End

    // SubmitForm
    const submitForm = async (event) => {
        event.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("skills", teacherData.skills)

        try {
            const response = await axios.post(baseUrl, teacherFormData);
            console.log(response)
            if (response.status === 201) {
                setTeacherData({
                    "full_name": '',
                    "email": '',
                    "password": '',
                    "qualification": '',
                    "mobile_no": '',
                    "skills": '',
                    "status": 'success'
                })
            }
            console.log(teacherFormData)
        } catch (error) {
            console.error('Error submitting form:', error);
            setTeacherData({ ...teacherFormData, status: 'error' });

        }
    }
    // End

    // rederect
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus === 'true') {
        window.location.href = '/teacher-dashboard';
    }

    useEffect(() => {
        document.title = 'Teacher Register';
    }, []);

    return (
        <>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-6 offset-3">
                        {teacherData.status === 'success' && <p className='text-bg-success'>Thanks for your registertion</p>}
                        {teacherData.status === 'error' && <p className='text-bg-danger '>Something went wrong. Please try again</p>}
                        <div className="card border-2 shadow">
                            <h5 className='card-header text-bg-info text-center m-4'>Teacher Register</h5>
                            <div className="card-body">
                                <form >
                                    <div className="mb-3">
                                        <label htmlFor="full_name" className="form-label">Full Name</label>
                                        <input value={teacherData.full_name} onChange={handleChange} type="text" className="form-control" id="full_name" name="full_name" aria-describedby="full_name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input value={teacherData.email} onChange={handleChange} type="email" className="form-control" id="email" name="email" aria-describedby="email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input value={teacherData.password} onChange={handleChange} type="password" className="form-control" id="password" name="password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="qualification" className="form-label">Qualification</label>
                                        <input value={teacherData.qualification} onChange={handleChange} type="text" className="form-control" id="qualification" name="qualification" aria-describedby="qualification" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobile_no" className="form-label">Mobile No.</label>
                                        <input value={teacherData.mobile_no} onChange={handleChange} type="number" className="form-control" id="mobile_no" name="mobile_no" aria-describedby="mobile_no" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="skills" className="form-label">Skills</label>
                                        <textarea value={teacherData.skills} onChange={handleChange} className='form-control' id="skills" name="skills"></textarea>
                                        <div className="form-text">Python, Java, PHP etc..</div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
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

export default TeacherRegister;






