import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherCreateCategory = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/category/`, formData)
            .then(response => {
                console.log('Category created successfully:', response.data);
                setSuccessMessage('Category created successfully!');
                // Redirect the user after successful submission
                setTimeout(() => {
                    window.location.href = '/teacher-Add-Courses';
                }, 3000); // Redirect after 3 seconds
            })
            .catch(error => {
                console.error('Error creating category:', error);
            });
    };

    useEffect(() => {
        document.title = 'Teacher | CreateCategory'
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center">Teacher - Create New Category</h5>
                        <div className="card-body">
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <form onSubmit={formSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" value={formData.title} onChange={handleChange} className="form-control" name="title" placeholder="Title" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea value={formData.description} onChange={handleChange} className="form-control" name="description" rows="2" placeholder="Enter your Description"></textarea>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherCreateCategory;
