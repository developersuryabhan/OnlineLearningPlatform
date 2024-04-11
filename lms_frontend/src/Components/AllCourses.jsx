import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const AllCourses = () => {
    const [courseData, setCourseData] = useState([]);
    //fatech courses when page load
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course/`)
                .then((response) => {
                    // console.log("Response data:", response.data);
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    
    useEffect(() =>{
        document.title = 'LMS | all-courses'
    })
    return (
        <>
            <div className="container mt-3">
                {/* Latest Courses */}
                <h3 className="pb-1 mb-4">Latest Courses <Link to="/all-courses" className=' float-end'>See All</Link></h3>
                <div className="row mp-4 ">
                    {courseData && courseData.map((course, index) =>
                        <div key={index} className="col-md-3 mb-4 text-center" >
                            <div className="card ">
                                <Link to={`/detail/${course.id}`}><img src={course.featured_image} className="card-img-top" alt={course.title} /></Link>
                                <div className="card-body">
                                    <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                                </div>
                            </div>
                        </div>
                    )}
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
        </>
    )
}

export default AllCourses
