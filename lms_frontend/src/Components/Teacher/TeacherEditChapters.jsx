import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherEditChapters = () => {
    const { chapter_id } = useParams();
    const [chapterData, setChapterData] = useState({
        course: '',
        title: '',
        description: '',
        prev_video: '',
        video:'',
        remarks: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChapterData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/chapter/${chapter_id}/`);
                setChapterData(response.data);
            } catch (error) {
                console.error('Error fetching chapter data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch chapter data!'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchChapterData();
    }, [chapter_id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChapterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setChapterData(prevData => ({
            ...prevData,
            [name]: files[0]
        }));
    }

const formSubmit = async (event) => {
    try {
        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Updating course data.',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('course', chapterData.course);
    formData.append('title', chapterData.title);
    formData.append('description', chapterData.description);
    if (chapterData.video !== null && chapterData.video !== undefined) {
        formData.append('video', chapterData.video);
    }
    formData.append('remarks', chapterData.remarks);
        const response = await axios.put(`${baseUrl}/chapter/${chapter_id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Updated chapter data:', response.data);
        // Reset form fields after successful update
        setChapterData({
            course: '',
            title: '',
            description: '',
            prev_video: '',
            video: '',
            remarks: ''
        });
        Swal.close();
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Chapter data updated successfully!'
        });
        // window.location.href = '/all-courses'; missing
    } catch (error) {
        console.error('Error updating chapter data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to update chapter data!'
        });
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        document.title = 'Teacher | Update-Chapters';
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header text-center">Update Chapters</h5>
                        <div className="card-body">
                            {loading && <p>Loading...</p>}
                            <form onSubmit={formSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input value={chapterData.title} onChange={handleChange} type="text" name='title' id='title' className="form-control" placeholder='Title' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea value={chapterData.description} onChange={handleChange} name='description' id='description' className="form-control" rows="3" placeholder="Enter your description here"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="video" className="col-sm-2 col-form-label">Video</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleFileChange} type="file" name='video' id='video' className="form-control" />
                                        {chapterData.prev_video && (
                                            <video controls width="100%" className='mt-2'>
                                                <source src={chapterData.video} type="video/mp4" />
                                                <source src={chapterData.prev_video} type="video/mp4" />
                                                Download the
                                                <a href={chapterData.video}>video</a>.
                                            </video>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">Remarks</label>
                                    <div className="col-sm-10">
                                        <textarea value={chapterData.remarks} onChange={handleChange} name='remarks' id='remarks' className="form-control" rows="2" placeholder="Additional remarks about the video"></textarea>
                                    </div>
                                </div><hr />
                                <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherEditChapters;
