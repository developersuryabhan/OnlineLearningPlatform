import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus') === 'true';
    const studentLoginStatus = localStorage.getItem('studentLoginStatus') === 'true';
    
    return (
        <>
            <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Online Learning Platform</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/about">About Us</Link>

                            <Link className="nav-link" to="/all-courses">Course</Link>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Teacher
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    {!teacherLoginStatus && (
                                     <>
                                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/teacher-register">Teacher Register</Link></li>
                                    </>
                                    )}
                                    {teacherLoginStatus && (
                                        <>
                                    <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                                    </>
                                    )}
                                </ul>
                            </li>

                                    {/* User */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!studentLoginStatus && (
                                    <>
                                    <li><Link className="dropdown-item" to="/student-login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/student-register">User Register</Link></li>
                                    </>
                                    )}
                                    {studentLoginStatus && (    
                                        <>
                                    <li><Link className="dropdown-item" to="/student-dashboard">Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/student-logout">Logout</Link></li>
                                    </>
                                    )}
                                </ul>
                            </li>   
                        </div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
