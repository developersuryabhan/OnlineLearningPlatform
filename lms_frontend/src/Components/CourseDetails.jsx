import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CSS/Styles.css';
import Swal from 'sweetalert2';

import axios from 'axios';

const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';

const CourseDetails = () => {
  const [courseData, setCourseData] = useState([]);
  const [chaptersData, setChaptersData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedcourseData, setRelatedcourseData] = useState([]);
  const [technology_listData, setTechnology_listData] = useState([]);
  const [studentLoginStatus, setStudentLoginStatus] = useState();
  const [enrollStatus, setEnrollStatus] = useState();
  const [ratingStatus, setRatingStatus] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const { course_id } = useParams();
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${baseUrl}/course/${course_id}/`);
        const data = response.data;
        console.log(data)
        setCourseData(data);
        setChaptersData(data.course_chapters);
        setTeacherData(data.teacher);
        const parsedRelatedcourseData = JSON.parse(data.related_video);
        setRelatedcourseData(parsedRelatedcourseData);
        setTechnology_listData(data.technology_list)
        if (data.course_rating !== '' && data.course_rating != null) {
          console.log('Fetched rating:', data.course_rating);
          setAvgRating(parseFloat(data.course_rating));
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    
    //Fatch enroll status
    try {
      axios.get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}/`)
        .then((response) => {
          if (response.data.bool === true) {
            setEnrollStatus('success')
          }
        });
    } catch (error) {
      console.error('Error :', error);
    }

    // Fetch course rating status
    try {
      axios.get(`${baseUrl}/fetch-rating-status/${studentId}/${course_id}/`)
        .then((response) => {
          if (response.data.bool === true) {
            setRatingStatus('success');
          }
        })
        .catch((error) => {
          console.error('Error fetching rating status:', error);
        });
    } catch (error) {
      console.error('Error fetching rating status:', error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
      setStudentLoginStatus('success');
    }

    fetchCourse();
  }, [course_id, studentId]);


  // enroll Course Studennt
  const enrollCourse = () => {
    const formData = new FormData();
    formData.append('course', course_id);
    formData.append('student', studentId);

    try {
      axios.post(`${baseUrl}/student-enroll-course/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: 'You have successfully enrolled in this course',
              icon: 'success',
              toast: true,
              timer: 10000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
            });
          }
          setEnrollStatus('success')
          console.log(response.data);
        })
    } catch (error) {
      console.error('Error enrolling course:', error);
    }
  }

  // add Course Rating

  const [ratingData, setRatingData] = useState({
    rating: '',
    review: ''
  });

  const handleChange = (event) => {
    setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('course', course_id);
    formData.append('student', studentId);
    formData.append('rating', ratingData.rating);
    formData.append('review', ratingData.review);
    try {
      const response = await axios.post(`${baseUrl}/course-rating/${course_id}/`, formData);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Rating has been added successfully',
          icon: 'success',
          toast: true,
          timer: 10000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
        });
        setRatingStatus('success');
        window.location.reload(); // load page after submit rating
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    document.title = 'Course Details';
  }, []);

  return (
    <>
      <div className="container mt-3 pb-2">
        <div className="row md-4">
          <div className=" col-md-4">
            <Link to="/teacher-details/1"><img src={courseData.featured_image} className="img-thumbnail" alt={courseData.title} /></Link>
          </div>
          <div className="col-8">
            <h3>{courseData.title}</h3>
            <p>{courseData.description}</p>
            <p className='fw-bold'>Course By: <Link to={`/teacher-details/${teacherData.id}`}>{teacherData.full_name}</Link></p>
            <p className='fw-bold'>Techs:&nbsp;
              {technology_listData.map((tech, index) => (
                <React.Fragment key={index}>
                  <Link to={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning m-sm-1'>{tech.trim()}</Link>&nbsp;
                </React.Fragment>
              ))}
            </p>
            <p className='fw-bold'>Duration: 3 hours 30 minutes</p>
            <p className='fw-bold'>Total Enrolled: {courseData.total_enrolled_students} Students</p>

            <div className='fw-bold'>
              Rating: {avgRating}/5
              {enrollStatus === 'success' && studentLoginStatus === 'success' &&
                <>
                  {ratingStatus !== 'success' &&
                    <button className='btn btn-success btn-sm ms-3' data-bs-toggle="modal" data-bs-target="#ratingModal" type="button">Rating</button>
                  }
                  {ratingStatus === 'success' &&
                    <small className=' badge bg-info text-dark ms-2'>You have already rated this course</small>
                  }
                  <div className="modal fade" id="ratingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                  >
                    <div className="modal-dialog  modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Rate for {courseData.title} </h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="rating" className="form-label">Rating</label>
                              <select onClick={handleChange} className='form-control' name='rating'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="review" className="form-label">Review</label>
                              <textarea onClick={handleChange} name="review" className="form-control" id="" cols="2" rows="2"></textarea>
                            </div>
                            <div className=' d-flex justify-content-center'>
                              <button onClick={formSubmit} type="submit" className="btn btn-primary">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>

            {enrollStatus === 'success' && studentLoginStatus === 'success' &&
              <p className='text-success'> <span>You are already Enroll in this course</span> </p>
            }
            {studentLoginStatus === 'success' && enrollStatus !== 'success' &&
              <p> <button onClick={enrollCourse} type='button' className='btn btn-success'>Enroll in this course</button> </p>
            }
            {studentLoginStatus !== 'success' &&
              <p className='text-primary'><Link to='/student-login'>Please login to enroll in this course</Link></p>
            }
          </div>
        </div>

        {/* Course Videos */}
        {enrollStatus === 'success' && studentLoginStatus === 'success' &&
          <div className="card mt-4">
            <h5 className='card-header'>In this course</h5>
            <ul className="list-group list-group-flush">
              {chaptersData.map((chapter, index) => (
                <li className="list-group-item" key={chapter.id}>{chapter.title}
                  <span className='float-end'>
                    <span className='me-5'>1 hours 30 Minutes </span>
                    <button className='btn btn-sm btn-danger ' data-bs-toggle="modal" data-bs-target="#videoModal"> <i className="bi bi-youtube"></i> </button>
                  </span>

                  {/* Video Model start */}
                  <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">{chapter.title}</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="ratio ratio-16x9">
                            <iframe src={chapter.video} title={chapter.title} allowFullScreen></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Video Model end */}

                </li>
              ))}
            </ul>
          </div>
        }

        <h3 className="pb-1 mt-5">Related Courses</h3>
        <div className="row mb-4">
          {relatedcourseData.map((rcourse, index) => (
            <div key={index} className="col-md-3">
              <div className="card">
                <Link target="_blank" to={`/detail/${rcourse.pk}`}>
                  <img
                    src={`${siteUrl}media/${rcourse.fields.featured_image}`}
                    className="card-img-top"
                    alt={rcourse.fields.title}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default CourseDetails;
