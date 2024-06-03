import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const CourseChapters = () => {
    const [chaptersData, setChaptersData] = useState([]);
    const [totalresult, setTotalresult] = useState(0);
    const { course_id } = useParams();

    // Fetch chapters when the component mounts
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course-chapters/` + course_id);
                console.log("Response data:", response.data);
                setChaptersData(response.data);
                setTotalresult(response.data.length);
            } catch (error) {
                console.log(error);
            }
        };
        fetchChapters();
    }, [course_id]);

    // Delete Chapter functon
    const handleDeleteChapter = async (chapterId) => {
        const confirmDelete = await Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this chapter!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });
        if (confirmDelete.isConfirmed) {
            try {
                // Send the delete request
                const response = await axios.delete(`${baseUrl}/chapter-delete/${chapterId}/`);
                console.log('Delete chapter response:', response.data);
                setChaptersData(prevChapters => prevChapters.filter(chapter => chapter.id !== chapterId));
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Chapter deleted successfully!',
                });
            } catch (error) {
                console.error('Error deleting chapter:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete chapter!',
                });
            }
        }
    };

    useEffect(() => {
        document.title = 'Teacher | Course-Chapters';
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
                            <h5 className="card-header text-center border-3 m-3">All Chapters ({totalresult}) <Link to={`/add-chapter/${course_id}`} className='btn btn-success btn-sm float-end text-white ms-1 active ms-2'><i className="bi bi-plus-circle-fill"></i> Add Chapter</Link></h5>
                            <div className="card">
                                <table className="table table-bordered border-2 text-center table-hover ">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Title</th>
                                            <th>Video</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chaptersData.map((chapter, index) => (
                                            <tr key={chapter.id}>
                                                <td>{index + 1}</td>
                                                <td><Link to={`/edit-chapter/${chapter.id}`}>{chapter.title}</Link></td>
                                                <td className='text-center'>
                                                    {/* Display video thumbnail or preview  */}
                                                    <video controls width="250">
                                                    <source src={chapter.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>  
                                                </td>
                                                <td>{chapter.remarks}</td>
                                                <td>
                                                    <Link to={`/edit-chapter/${chapter.id}`} className='btn btn-sm text-white btn-info ms-1'><i className="bi bi-pencil-square"> Edit</i></Link>
                                                    <button onClick={() => handleDeleteChapter(chapter.id)} className='btn btn-sm btn-danger ms-1 '><i className="bi bi-trash3"></i> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
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

export default CourseChapters;
