import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const PopularTeachers = () => {
  const [teachers, setTeachers] = useState([])
  useEffect(() => {
    axios.get(baseUrl + '/teacher/').then((Response) => {
      setTeachers(Response.data);
    })
  }, [])
  console.log(teachers)

  return (
    <>
      <div className="container mt-3">
        <h3 className="pb-1 mb-4">Popular Teachers <Link to="/popular-teachers" className=' float-end'>See All</Link></h3>
        <div className="row mp-4">
          {teachers.map((teacher) => (
            <div className="col-md-3 mb-4" key={teachers.id}>
              <div className="card">
                <Link to={`/teacher-details/${teachers.id}`}>
                  <img src="/image/self.jpg" className="card-img-top" alt="Teacher" />

                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/teacher-details/${teacher.id}`}>{teachers.full_name}</Link>
                  </h5>
                </div>
                <div className="card-footer">
                  <div className="title">
                    <span>Rating: 4.5/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
          <li className="page-item"><Link className="page-link" to="#">1</Link></li>
          <li className="page-item"><Link className="page-link" to="#">2</Link></li>
          <li className="page-item"><Link className="page-link" to="#">3</Link></li>
          <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
        </ul>
      </nav>

    </>
  );
};

export default PopularTeachers
