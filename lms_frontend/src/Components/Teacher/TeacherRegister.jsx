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
           <div className='container-fluid bg-light min-vh-100 mt-5 align-items-center justify-content-center'>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-4">
                        {teacherData.status === 'success' && <div className='alert alert-success text-center'>Thanks for your registration</div>}
                        {teacherData.status === 'error' && <div className='alert alert-danger text-center'>Something went wrong. Please try again</div>}
                            <div className="card-body bg-warning p-4">
                                <div className="card-header  ">
                                    <h5 className='m-0 text-center fw-bold'>Teacher Register</h5>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="full_name" className="form-label fw-bold">Full Name</label>
                                        <input value={teacherData.full_name} onChange={handleChange} type="text" className="form-control" id="full_name" name="full_name" aria-describedby="full_name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                                        <input value={teacherData.email} onChange={handleChange} type="email" className="form-control" id="email" name="email" aria-describedby="email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                                        <input value={teacherData.password} onChange={handleChange} type="password" className="form-control" id="password" name="password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="qualification" className="form-label fw-bold">Qualification</label>
                                        <input value={teacherData.qualification} onChange={handleChange} type="text" className="form-control" id="qualification" name="qualification" aria-describedby="qualification" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobile_no" className="form-label fw-bold">Mobile No.</label>
                                        <input value={teacherData.mobile_no} onChange={handleChange} type="number" className="form-control" id="mobile_no" name="mobile_no" aria-describedby="mobile_no" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="skills" className="form-label fw-bold">Skills</label>
                                        <textarea value={teacherData.skills} onChange={handleChange} className='form-control' id="skills" name="skills"></textarea>
                                        <div className="form-text fw-bold">Python, Java, PHP etc..</div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button onClick={submitForm} type="submit" className="btn btn-success w-100">Register</button>
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
