import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
const MyCourses = () => {
    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <Sidebar />
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header text-center border-3 m-3">My Courses</h5>
                            <div className="card">
                                <table className="table table-bordered border-2  table-hover ">
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Name</th>
                                            <th>Created By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>PHP Development</td>
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
export default MyCourses