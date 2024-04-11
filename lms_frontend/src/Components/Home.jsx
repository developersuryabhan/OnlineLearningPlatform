import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const Home = () => {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        // Fetch only 4 courses for the home page
        axios.get(`${baseUrl}/course/?limit=4`)
            .then(response => {
                // console.log("Response data:", response.data);
                setCourseData(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    useEffect(() => {
        document.title = 'LMS | Home Page'
    })

    return (
        <div className="container mt-4 mt-5">
            {/* <AllCourses /> */}

            {/* Latest Courses */}
            <h3 className="pb-1 mb-4">Latest Courses <Link to="/all-courses" className=' float-end'>See All</Link></h3>
            <div className="row mp-4">
                {courseData && courseData.map((course, index) =>
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card">
                            <Link to={`/detail/${course.id}`}><img src={course.featured_image} className="card-img-top" alt={course.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {/* End Latest Courses */}

            {/* Popular Latest Courses */}
            <h3 className="pb-1 mb-4 mt-5">Popular Courses <Link to="/popular-courses" className=' float-end'>See All</Link></h3>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <Link to="/detail/1"><img src="/logo512.png" className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><a href="/detail/1">Course title</a></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 13234</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* End Popular Latest Courses */}

            {/* Popular Teachers */}
            <h3 className="pb-1 mb-4 mt-5">Popular Teachers <Link to="/popular-teachers" className=' float-end'>See All</Link></h3>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <Link to="/teacher-details/1"><img src="/image/self.jpg" className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* End Popular Teachers */}

            {/* Student Testimonial */}
            <h3 className="pb-1 mb-4 mt-5">Student Testimonial </h3>
            <div id="carouselExampleCaptions" className="carousel slide bg-dark text-white mt-2 py-5  ">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner ">
                    <div className="carousel-item active">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer text-white">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="carousel-item">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="carousel-item">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* End Student Testimonial */}
        </div>

    )
}

export default Home
