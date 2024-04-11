import React from 'react'
import { Link } from 'react-router-dom'

const PopularCourses = () => {
    return (
        <>
            <div className="container mt-3">

                {/* Latest Courses */}
                <h3 className="pb-1 mb-4">Popular Courses <Link to="/popular-courses" className=' float-end'>See All</Link></h3>
                <div className="row mp-4">
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <Link to="/detail/1"><img src="/python.png" className="card-img-top" alt="..." /></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                            <div className="card-footer">
                                <div className="title">
                                    <span>Rating: 4.5/5</span>
                                    <span className='float-end'>Views: 13234</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Latest Courses */}

                    {/* pagination start */}
                    <nav aria-label="Page navigation example mt-5">
                      <ul className="pagination justify-content-center">
                        <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                      </ul>
                    </nav>
                    {/* End pagination  */}
                </div>
            </div>
        </>
    )
}

export default PopularCourses
