import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TeacherSidebar from './TeacherSidebar';

const baseUrl = 'http://127.0.0.1:8000/api';

const EditCourse = () => {
    const [cats, setCats] = useState([]);
    const { course_id } = useParams();
    const [teachers, setTeachers] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        teacher: '',
        title: '',
        description: '',
        prev_f_image: '',
        f_image: '',
        technology: ''
    });

    useEffect(() => {
        // Fetch categories
        axios.get(`${baseUrl}/category/`)
            .then(response => {
                setCats(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // Fetch Course Current data
        axios.get(`${baseUrl}/teacher-course-detail/${course_id}/`)
            .then(response => {
                setCourseData({
                    category: response.data.category,
                    teacher: response.data.teacher,
                    title: response.data.title,
                    description: response.data.description,
                    prev_f_image: response.data.featured_image,
                    technology: response.data.technology,
                    f_image: ''
                });
            })
            .catch(error => {
                console.error('Error fetching course data:', error);
            });

        // Fetch teachers
        axios.get(`${baseUrl}/teacher/`)
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, [course_id]);

    const handleInputChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }

    const hendleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }

    // Course update function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                icon: 'info',
                title: 'Please wait...',
                text: 'Updating course data.',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });
            const formData = new FormData();
            formData.append('category', courseData.category);
            formData.append('teacher', courseData.teacher);
            formData.append('title', courseData.title);
            formData.append('description', courseData.description);
            if (courseData.f_image !== null && courseData.f_image !== undefined) {
                formData.append('featured_image', courseData.f_image);
            }
            formData.append('technology', courseData.technology);

            const response = await axios.put(`${baseUrl}/teacher-course-detail/${course_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Updated course data:', response.data);
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Course data updated successfully!'
            });
              window.location.href = '/teacher-my-Courses';
        } catch (error) {
            console.error('Error updating course data:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update course data!'
            });
        }
    };

    useEffect(() => {
        document.title = 'Teacher | Edit Course';
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center">Teacher - Edit Course</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                    <div className="mb-3 row">
                                        <label htmlFor="title" className="col-sm-2 col-form-label">Category</label>
                                        <div className="col-sm-10">
                                            <select name="category" value={courseData.category} onChange={handleInputChange} className='form-control'>
                                                {cats.map((category, index) => (
                                                    <option key={index} value={category.id}>{category.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="teacher" className="col-sm-2 col-form-label">Teacher Name</label>
                                        <div className="col-sm-10">
                                            <select name="teacher" value={courseData.teacher} onChange={handleInputChange} className='form-control'>
                                                {teachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="text" value={courseData.title} onChange={handleInputChange} className="form-control" name='title' placeholder='Title' />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea value={courseData.description} onChange={handleInputChange} className="form-control" name='description' rows="2" cols="75" placeholder="Enter your Description"></textarea>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="featured_image" className="col-sm-2 col-form-label form-contro">Upload Featured Image</label>
                                        <div className="col-sm-10">
                                            <input type="file" onChange={hendleFileChange} name='f_image' id='f_image' className="form-control" />

                                            {courseData.prev_f_image && (
                                                <p className='mt-2'><img src={courseData.prev_f_image} width='200' alt="..." /></p>

                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="technology" className="col-sm-2 col-form-label " >Technology</label>
                                        <div className="col-sm-10">
                                            <textarea name='technology' id='technology' value={courseData.technology} onChange={handleInputChange} className="form-control" rows="2" cols="75" placeholder="Python, Java"></textarea>
                                        </div>
                                    </div>
                                    <hr />
                                <hr />
                                <div className="container">
                                  <div className="row">
                                      <div className="col text-center">
                                          <button type="submit" className="btn btn-primary">Click to Edit</button>
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
}

export default EditCourse   


