import TeacherSidebar from './TeacherSidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import '../CSS/Styles.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherDashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    
    // Fetch courses when the component mounts
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/teacher_dashboard/${teacherId}/`);
                setDashboardData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
    
        if (teacherId) {
            fetchDashboardData();
        }
    }, [teacherId]);
    

    useEffect(() => {
        document.title = 'Teacher | Dashboard';
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center border-3 p-3 fw-bold bg-dark-subtle"> Dashboard</h5>
                        {/* <h5 className="card-header">My Courses</h5> */}

                        <div className="row mt-4">
                            <div className="col-md-4">
                                <div className="card-header-primary">
                                    <h5 className="card-header bg-primary text-white">Total Courses</h5>
                                    <div className="card-body">
                                        <h3><Link to="/teacher-my-Courses">{dashboardData.total_teacher_courses}</Link></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-header-success">
                                    <h5 className="card-header bg-success text-white">Total Students</h5>
                                    <div className="card-body">
                                        <h3><Link to="/user-list">{dashboardData.total_teacher_students}</Link></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-header-info">
                                    <h5 className="card-header bg-info text-white">Total Chapters</h5>
                                    <div className="card-body">
                                        <h3><Link to="/teacher-my-Courses">{dashboardData.total_teacher_chapters}</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherDashboard;
