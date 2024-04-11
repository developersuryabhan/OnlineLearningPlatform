import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const AddChapters = () => {
    const { course_id } = useParams();
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: null,
        remarks: ''
    });

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }

    const formSubmit = async () => {
        const formData = new FormData();
        formData.append('course', course_id);
        formData.append('title', chapterData.title);
        formData.append('description', chapterData.description);
        formData.append('video', chapterData.video);
        formData.append('remarks', chapterData.remarks);

        try {
            const response = await axios.post(`${baseUrl}/chapter/`, formData);
            console.log("data:", response.data);
            await Swal.fire({
                icon: 'success',
                title: 'Chapter added successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.href = '/teacher-my-Courses';
            setChapterData({
                title: '',
                description: '',
                video: '',
                remarks: ''
            });
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: 'error',
                title: 'Failed to add chapter. Please try again.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    useEffect(() => {
        document.title = 'Teacher | Add Chapter';
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
                            <h5 className="card-header text-center">Add Chapters</h5>
                            <div className="card-body">
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} type="text" name='title' id='title' className="form-control" placeholder='Title' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea onChange={handleChange} name='description' id='description' className="form-control" rows="3" placeholder="Enter your description here"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="video" className="col-sm-2 col-form-label">Video</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleFileChange} type="file" name='video' id='video' className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">Remarks</label>
                                    <div className="col-sm-10">
                                        <textarea onChange={handleChange} name='remarks' id='remarks' className="form-control" rows="2" placeholder="Additional remarks about the video"></textarea>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                    <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                                    </div>
                                </div>
                            </div>

                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default AddChapters;
