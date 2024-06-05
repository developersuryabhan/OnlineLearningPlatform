import Sidebar from './Sidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const RecommendedCourses = () => {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/fetch_recommended_courses/${studentId}/`);
                setCourseData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, [studentId]);

    useEffect(() => {
        document.title = 'Student | Recommended Courses';
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9 text-center">
                    <div className="card">
                        <h5 className="card-header border-3 m-3">Recommended Courses</h5>
                        <div className="card">
                            <table className="table table-bordered border-2 table-hover">
                                <thead>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>Name</th>
                                        <th>Technologies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.length > 0 ? courseData.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/detail/${row.id}`}>{row.title}</Link></td>
                                            <td>{row.technology}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3">No recommended courses available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecommendedCourses;
