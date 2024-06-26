import React from 'react'
// import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
const ProfileSetting = () => {
    return (
        <>
            <div className='container mt-4'>
                <div className="row">
                    <aside className="col-md-3">
                        <Sidebar />
                    </aside>
                    <section className="col-md-9">

                        <div className="card">
                            <h5 className="card-header">Profile Setting</h5>
                            <div className="card-body">
                                <div className="mb-3 row">
                                    <label for="text" className="col-sm-2 col-form-label">Full Name</label>
                                    <div className="col-sm-10">
                                        <input type="text"  className="form-control" id="full_name" value="full_name"  />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="email" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="text"  className="form-control" id="staticEmail" value="email@example.com" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="file" className="col-sm-2 col-form-label">Profile Photo</label>
                                    <div className="col-sm-10">
                                        <input type="file"  className="form-control" id="photo" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword" value="******" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="text" className="col-sm-2 col-form-label">Interest</label>
                                    <div className="col-sm-10">
                                        <input type="text"  className="form-control" id="interest" value="Python,"  />
                                    </div>
                                </div>
                                <hr />
                                <button className='btn btn-primary '>Update</button>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    )
}

export default ProfileSetting
