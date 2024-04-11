import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherAddCourses = () => {
    const [cats, setCats] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        teacher: '',
        title: '',
        description: '',
        featured_image: '',
        technology: ''
    });

    useEffect(() => {
        axios.get(`${baseUrl}/category/`)
            .then(response => {
                setCats(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get(`${baseUrl}/teacher/`)
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setCourseData({
            ...courseData,
            [name]: value,
            teacher_id: name === 'teacher' ? parseInt(value) : courseData.teacher_id
        });
    };

    const handleFileChange = event => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    };

    const formSubmit = async event => {
        event.preventDefault(); // Prevent default form submission

        // Validate required fields
        if (!courseData.category || !courseData.teacher || !courseData.title || !courseData.description || !courseData.featured_image || !courseData.technology) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            });
            return;
        }

        const formData = new FormData();
        formData.append('category', courseData.category);
        formData.append('teacher', courseData.teacher);
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('featured_image', courseData.featured_image);
        formData.append('technology', courseData.technology);

        try {
            const response = await axios.post(`${baseUrl}/course/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'New course created successfully!',
            });

            console.log('Course created:', response.data);
            // Redirect to the teacher's course page
            // window.location.href = '/teacher-my-courses';
        } catch (error) {
            console.error('Error creating course:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create new course! Please try again.',
            });
        }
    };

    useEffect(() => {
        document.title = 'Teacher | AddCourses';
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center">Teacher - Add Course <Link to={`/teacher-create-new-category`} className='btn btn-success btn-sm float-end text-white ms-1 active ms-2'><i className="bi bi-plus-circle-fill"></i> Create New Category</Link></h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select name="category" onChange={handleChange} className='form-control' required>
                                            <option value="">Select Category</option>
                                            {cats.map(category => (
                                                <option key={category.id} value={category.id}>{category.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="teacher" className="col-sm-2 col-form-label">Teacher Name</label>
                                    <div className="col-sm-10">
                                        <select name="teacher" onChange={handleChange} className='form-control' required>
                                            <option value="">Select Teacher</option>
                                            {teachers.map(teacher => (
                                                <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" onChange={handleChange} className="form-control" name="title" placeholder="Title" required />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea onChange={handleChange} className="form-control" name="description" rows="2" placeholder="Enter your Description" required></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="featured_image" className="col-sm-2 col-form-label">Featured Image</label>
                                    <div className="col-sm-10">
                                        <input type="file" onChange={handleFileChange} name="featured_image" id="video" className="form-control" required />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="technology" className="col-sm-2 col-form-label">Technology</label>
                                    <div className="col-sm-10">
                                        <textarea name="technology" onChange={handleChange} className="form-control" rows="2" placeholder="Python, Java" required></textarea>
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

export default TeacherAddCourses;
