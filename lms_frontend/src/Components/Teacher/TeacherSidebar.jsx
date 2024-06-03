import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
    return (
        <>
            <div className="card">
                <div className="list-group list-group-flush">
                    <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    <Link to="/teacher-my-Courses" className="list-group-item list-group-item-action">My Courses</Link>
                    <Link to="/teacher-Add-Courses" className="list-group-item list-group-item-action">Add Courses</Link>
                    <Link to="/user-list" className="list-group-item list-group-item-action">Student List</Link>
                    <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                    <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
                    <Link  to="/teacher-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
                </div>
            </div>
        </>
    )
}

export default TeacherSidebar
