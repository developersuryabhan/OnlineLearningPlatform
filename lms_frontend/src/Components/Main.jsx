import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import About from './About'

import CourseDetails from './CourseDetails'
import TeacherDetails from './TeacherDetails'

// User
import Login from './User/Login'
import Logout from './User/Logout'
import Register from './User/Register'
import MyCourses from './User/MyCourses'
import Dashboard from './User/Dashboard'
import FavoriteCourses from './User/FavoriteCourses'
import RecommendedCourses from './User/RecommendedCourses'
import ProfileSetting from './User/ProfileSetting'
import ChangePassword from './User/ChangePassword'
// Teacher
import TeacherRegister from './Teacher/TeacherRegister'
import TeacherLogin from './Teacher/TeacherLogin'
import TeacherLogout from './Teacher/TeacherLogout'
import TeacherDashboard from './Teacher/TeacherDashboard'
import TeacherMyCourses from './Teacher/TeacherMyCourses'
import EnrolledStudents from './Teacher/EnrolledStudents'
import TeacherAddCourses from './Teacher/TeacherAddCourses'
import EditCourse from './Teacher/EditCourse'
import AddChapters from './Teacher/AddChapters'
import CourseChapters from './Teacher/CourseChapters'
import TeacherEditChapters from './Teacher/TeacherEditChapters'
import UserList from './Teacher/UserList'
import TeacherProfileSetting from './Teacher/TeacherProfileSetting'
import TeacherChangePassword from './Teacher/TeacherChangePassword'
import TeacherCreateCategory from './Teacher/TeacherCreateCategory'
// List Pages
import AllCourses from './AllCourses'
import PopularCourses from './PopularCourses'
import PopularTeachers from './PopularTeachers'
import CategoryCourses from './CategoryCourses'
import TeacherSkillCourses from './TeacherSkillCourses'
import Footer from './Footer'

const Main = () => {
    return (
        <>
            <div>
                <Header />
                <Switch >
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/allcourses' element={<AllCourses />} />
                    <Route path='/detail/:course_id' element={<CourseDetails />} />
                    {/* User */}
                    <Route path='/student-login' element={<Login />} />
                    <Route path='/student-logout' element={<Logout />} />
                    <Route path='/student-register' element={<Register />} />
                    <Route path='/student-dashboard' element={<Dashboard />} />
                    <Route path='/my-courses' element={<MyCourses />} />
                    <Route path='/favorite-courses' element={<FavoriteCourses />} />
                    <Route path='/recommended-courses' element={<RecommendedCourses />} />
                    <Route path='/profile-setting' element={<ProfileSetting />} />
                    <Route path='/change-password' element={<ChangePassword />} />
                    {/* <Route path='/change-password' element={<ChangePassword />} /> */}
                    {/* teacher */}
                    <Route path='/teacher-login' element={<TeacherLogin />} />
                    <Route path='/teacher-logout' element={<TeacherLogout />} />
                    <Route path='/teacher-register' element={<TeacherRegister />} />
                    <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
                    <Route path='/teacher-my-Courses' element={<TeacherMyCourses />} />
                    <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />} />
                    <Route path='/teacher-Add-Courses' element={<TeacherAddCourses />} />
                    <Route path='/edit-course/:course_id' element={<EditCourse />} />
                    <Route path='/add-chapter/:course_id' element={<AddChapters />} />
                    <Route path='/edit-chapter/:chapter_id' element={<TeacherEditChapters />} />
                    <Route path='/user-list' element={<UserList />} />
                    <Route path='/teacher-profile-setting' element={<TeacherProfileSetting />} />
                    <Route path='/teacher-change-password' element={<TeacherChangePassword />} />
                    <Route path='/teacher-details/:teacher_id' element={<TeacherDetails />} />
                    <Route path='/all-courses' element={<AllCourses />} />
                    <Route path='/all-courses/:course_id' element={<CourseChapters />} />
                    <Route path='/popular-courses' element={<PopularCourses />} />
                    <Route path='/popular-teachers' element={<PopularTeachers />} />
                    <Route path='/category/:category_slug' element={<CategoryCourses />} />
                    <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherSkillCourses />} />
                    <Route path='/teacher-create-new-category' element={<TeacherCreateCategory />} />
                </Switch>
                <Footer />
            </div>
        </>
    )
}

export default Main
              