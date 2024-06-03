import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar'

const baseUrl = 'http://127.0.0.1:8000/api';

const EnrolledStudents = () => {
    const [studentData, setStudentData] = useState([]);
    let { course_id } = useParams();

    //fatech courses
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-enrolled-students/${course_id}/`)
                .then((response) => {
                    setStudentData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [course_id]);

    useEffect(() => {
        document.title = 'Teacher | EnrolledStudents';
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
                            <h5 className="card-header text-center border-3 m-3">Teacher | Enrolled Students List</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover  text-center ">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>student Name</th>
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((row, index) => (
                                            <tr key={row.student.id}>
                                                <th>{index + 1}</th>
                                                <th><Link to={`/view-student/${row.student.id}`}>{row.student.full_name}</Link></th>
                                                <td>{row.student.email}</td>
                                                <td>{row.student.username}</td>
                                                <td>
                                                    <Link to={`/view-student/${row.student.id}`} className='btn btn-sm text-block btn-info ms-2'><i className="bi bi-pencil-square"> View</i></Link>
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
export default EnrolledStudents
