import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'

const UserList = () => {
    useEffect(() => {
        document.title = 'Teacher | UserList';
    }, []);
    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar />
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header text-center border-3 m-3">My User</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover ">
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Name</th>
                                            <th>Enrolled Course</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>PHP</td>
                                            <td > <Link to="/">Suryabhan</Link></td>
                                            <td><button className='btn btn-danger btn-sm active '>Delete</button></td>
                                        </tr>
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
