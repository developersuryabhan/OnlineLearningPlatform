import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar'
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherMyCourses = () => {
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    //fatech courses when page load
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/teacher-courses/` + teacherId)
                .then((response) => {
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [teacherId]);

      // Delete Course Function
const confirmDeleteCourse = (courseId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this course!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
    }).then((result) => {
        if (result.isConfirmed) {
            handleDeleteCourse(courseId);
        }
    });
};

const handleDeleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`${baseUrl}/delete-teacher-course-detail/${courseId}/`);
        if (response.status === 204) {
            setCourseData(courseData.filter(course => course.id !== courseId));
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to delete course!'
        });
    }
};

    useEffect(() => {
        document.title = 'Teacher | MyCourses';
    }, []);

    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar />
                    </aside>
                    <section className="col-md-9">
                        <div className="card ">
                            <h5 className="card-header text-center border-3 m-3">Teacher | My Courses</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover  text-center ">
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
                                                <th>{index + 1}</th>
                                                <th><Link to={`/all-courses/${course.id}`}  >{course.title}</Link></th>
                                                <td><img src={course.featured_image} width="80" alt={course.title} className='dashboard-img' /></td>
                                                <td>
                                                    <Link to={`/enrolled-students/${course.id}`}>{course.total_enrolled_students}</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/edit-course/${course.id}`} className='btn btn-sm text-block btn-info ms-2'><i className="bi bi-pencil-square"> Edit</i></Link>
                                                    <Link to={`/add-chapter/${course.id}`} className='btn btn-success btn-sm text-white ms-1 active ms-2'><i className="bi bi-plus-circle-fill"></i> Add Chapter</Link>
                                                    {/* delete */}
                                                      <button onClick={() => confirmDeleteCourse(course.id)} className='btn btn-sm btn-danger ms-2'><i className="bi bi-trash3"></i> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default TeacherMyCourses
