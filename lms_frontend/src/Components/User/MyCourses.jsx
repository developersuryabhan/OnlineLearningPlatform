import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const MyCourses = () => {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    //fatech courses
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-enrolled-courses/${studentId}/`)
                .then((response) => {
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        document.title = 'Student | My Courses';
    }, []);

    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <Sidebar />
                    </aside>
                    <section className="col-md-9 text-center">
                        <div className="card">
                            <h5 className="card-header  border-3 m-3">My Courses</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover ">
                                    <thead>
                                        {courseData.map((row, index) => (
                                            <tr>
                                                <th>S.NO</th>
                                                <th>Name</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody>
                                        {courseData.map((row, index) => (
                                            <tr key={row.course.id}>
                                                <td>{index + 1}</td>
                                                <td><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></td>
                                                <td><Link to={`/teacher-details/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                                <td><div className='d-flex justify-content-center'><button className="btn btn-danger w-70 active">Remove Enrollment</button></div></td>
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
export default MyCourses