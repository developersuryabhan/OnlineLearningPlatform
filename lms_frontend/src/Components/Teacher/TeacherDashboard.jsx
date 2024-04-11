import React, { useEffect, useState } from 'react';
import '../CSS/Styles.css';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherDashboard = () => {
    const [courseData, setCourseData] = useState([]);

    // Fetch courses when the component mounts
    useEffect(() => {
        const teacherId = localStorage.getItem('teacherId');
        if (teacherId) {
            axios.get(`${baseUrl}/teacher-courses/${teacherId}`)
                .then(response => {
                    setCourseData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    }, []);

    // Delete Course Function
    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete-teacher-course-detail/${courseId}/`);
            if (response.status === 204) {
                // Remove the deleted course from the state
                setCourseData(courseData.filter(course => course.id !== courseId));
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Course deleted successfully!'
                });
            } else {
                throw new Error('Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            // Display error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete course!'
            });
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center border-3 m-3">Teacher | Dashboard</h5>
                        <div className="card">
                            <h5 className="card-header">My Courses</h5>
                            <div className="card-body mt-3">
                                <table className="table table-bordered border-2 table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Course Name</th>
                                            <th>Image</th>
                                            <th>Total Enrolled</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course, index) => (
                                            <tr key={course.id}>
                                                <td>{index + 1}</td>
                                                <td>{course.title}</td>
                                                <td><img src={course.featured_image} alt={course.title} className="dashboard-img" /></td>
                                                <td>{course.total_enrolled}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherDashboard;
