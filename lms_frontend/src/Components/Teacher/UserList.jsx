import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar'

const baseUrl = 'http://127.0.0.1:8000/api';

const UserList = () => {
    const [studentData, setStudentData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    //fatech  All Enrolled student
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-all-enrolled-students/${teacherId}/`)
                .then((response) => {
                    setStudentData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

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
                            <h5 className="card-header text-center border-3 m-3 fw-bold">Teacher | ALL Students List</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover  text-center ">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>student Name</th>
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th>Interested categories</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((row, index) => (
                                            <tr key={row.student.id}>
                                                <th>{index + 1}</th>
                                                <th>{row.student.full_name}</th>
                                                <td>{row.student.email}</td>
                                                <td>{row.student.username}</td>
                                                <td>{row.student.interested_categories}</td>
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

export default UserList
