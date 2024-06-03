import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';
import '../CSS/ProfleImg.css'
const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherProfileSetting = () => {
    const [teacherData, setTeacherData] = useState({
        full_name: '',
        email: '',
        qualification: '',
        mobile_no: '',
        skills: '',
        profile_img: '',
        p_img: '',
        address: '',
        interest: '',
        status: ''
    });
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        // Fetch Current Teacher data
        axios.get(`${baseUrl}/teacher/${teacherId}/`)
            .then(response => {
                setTeacherData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    qualification: response.data.qualification,
                    mobile_no: response.data.mobile_no,
                    skills: response.data.skills,
                    address: response.data.address,
                    interest: response.data.interest,
                    profile_img: response.data.profile_img,
                    p_img: ''
                });
            })
            .catch(error => {
                console.error('Error fetching teacher data:', error);
            });
    }, [teacherId]);

    // Change Element Value
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        });
    };

    // SubmitForm
    const submitForm = async (event) => {
        event.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name);
        teacherFormData.append('email', teacherData.email);
        teacherFormData.append('qualification', teacherData.qualification);
        teacherFormData.append('mobile_no', teacherData.mobile_no);
        teacherFormData.append('skills', teacherData.skills);
        teacherFormData.append('address', teacherData.address);
        teacherFormData.append('interest', teacherData.interest);

        if (teacherData.p_img !== '') {
            teacherFormData.append('profile_img', teacherData.p_img, teacherData.p_img.name);
        }

        try {
            const response = await axios.put(`${baseUrl}/teacher/${teacherId}/`, teacherFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setTeacherData({
                    ...teacherData,
                    status: 'success'
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setTeacherData({
                ...teacherData,
                status: 'error'
            });
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update Profile',
                text: error.response?.data?.message || 'Something went wrong!',
            });
        }
    };

    useEffect(() => {
        document.title = 'Teacher | Profile Setting';
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center border-3 m-3 fw-bold">Profile Setting</h5>
                        <div className="card-body p-4">
                            <form onSubmit={submitForm}>
                                <div className="row mb-3">
                                      <div className="col">
                                          <label className="form-label fw-bold" htmlFor="full_name">Full Name</label>
                                          <input type="text" className="form-control" id="full_name" value={teacherData.full_name} onChange={handleChange} name="full_name" />
                                      </div>
                                      <div className="col">
                                            <label htmlFor="p_img" className="form-label fw-bold">Profile Photo</label>
                                          <input type="file" onChange={handleFileChange} name="p_img" id="p_img" className="form-control" />
                                      </div>
                                    <div className="col mb-3 row">
                                    <div className="col-sm-10">
                                        {teacherData.profile_img && (
                                          <div className="profile-img-container">
                                              <img src={teacherData.profile_img} className="img-fluid rounded-circle" alt={teacherData.full_name} />
                                          </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label fw-bold" htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" value={teacherData.email} onChange={handleChange} name="email" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="mobile_no" className="form-label fw-bold">Mobile No.</label>
                                        <input value={teacherData.mobile_no} onChange={handleChange} type="number" className="form-control" id="mobile_no" name="mobile_no" aria-describedby="mobile_no" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label fw-bold" htmlFor="qualification">Qualification</label>
                                        <input type="text" className="form-control" id="qualification" value={teacherData.qualification} onChange={handleChange} name="qualification" />
                                        <div className="form-text fw-bold">e.g., B.E., M.Sc., Ph.D., etc.</div>
                                    </div>
                                    <div className="col">
                                        <label className="form-label fw-bold" htmlFor="skills">Skills</label>
                                        <input type="text" className="form-control" id="skills" value={teacherData.skills} onChange={handleChange} name="skills" />
                                        <div className="form-text fw-bold">e.g., Python, Java, PHP, etc.</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label fw-bold" htmlFor="interest">Interest</label>
                                        <input type="text" className="form-control" id="interest" value={teacherData.interest} onChange={handleChange} name="interest" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                                        <input value={teacherData.address} onChange={handleChange} type="text" className="form-control" id="address" name="address" aria-describedby="address" />
                                    </div>
                                </div>
                                <div className='d-grid'>
                                    <button type="submit" className="btn btn-success">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherProfileSetting;
