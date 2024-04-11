import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherDetails = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [skilllist, setskilllist] = useState([]);
  let { teacher_id } = useParams();


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${baseUrl}/teacher/${teacher_id}/`);
        const data = response.data;
        // console.log(data)
        setTeacherData(data);
        setCourseData(data.teacher_courses);
        setskilllist(data.skill_list);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [teacher_id]);

  useEffect(() => {
    document.title = 'Teacher | Details';
  }, []);


  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-4">

            <Link to="#"><img src="/image/self.jpg" className="Teacher_Profile-img-thumbnail" alt="Teacher..." /></Link>
          </div>
          <div className="col-8">
            <h3>{teacherData.full_name}</h3>
            <p>{teacherData.detail}</p>
            <p className='fw-bold '>Skills:&nbsp;
            {skilllist.map((skill, index) => (
              <React.Fragment key={index}>
              <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className='badge badge-pill text-dark bg-warning m-sm-1'>{skill.trim()}</Link>&nbsp;
              </React.Fragment>
            ))}
            </p>
            <p className='fw-bold'>Recent Courses: <Link to="/category/php"> ReactJs</Link></p>
            <p className='fw-bold'>Rating: 4.5/5</p>
          </div>
        </div>
        {/* Course Video */}
        <div className="card mt-3">
          <div className='card-header'>
            <h5>Course List</h5>
          </div>
          <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <>
            <Link to={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
            </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherDetails
