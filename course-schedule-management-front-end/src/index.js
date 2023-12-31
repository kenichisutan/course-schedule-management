import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import New from './components/New';
import Update from './components/Update';
import Cancel from './components/Cancel';
import ErrorPage from './components/ErrorPage';
import Courses from './components/Courses';
import Login from "./components/Login";
import Cookies from "js-cookie";
import Manage from "./components/Manage";
import Users from "./components/Users";
import ManageCourses from "./components/ManageCourses";
import UsersNew from "./components/UsersNew";
import User from "./components/User";
import UserEdit from "./components/UserEdit";
import Course from "./components/Course";
import CourseEdit from "./components/CourseEdit";

const isAuthenticated = () => {
    const accessToken = Cookies.get('access_token');
    console.log("access token: ", accessToken);
    return !!accessToken; // Return true if access token exists, otherwise false
};

const router = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} errorElement={<ErrorPage />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:semester/:department/:number/:section" element={<Course />} />
                {/* Protected routes */}
                <Route path="/new" element={isAuthenticated() ? <New /> : <Navigate to="/login" />} />
                <Route path="/update" element={isAuthenticated() ? <Update /> : <Navigate to="/login" />} />
                <Route path="/cancel" element={isAuthenticated() ? <Cancel /> : <Navigate to="/login" />} />
                <Route path="/course/:semester/:department/:number/:section/edit" element={isAuthenticated() ? <CourseEdit /> : <Navigate to="/login" />} />
                <Route path="/manage" element={isAuthenticated() ? <Manage /> : <Navigate to="/login" />} />
                <Route path="/manage/users" element={isAuthenticated() ? <Users /> : <Navigate to="/login" />} />
                <Route path="/manage/users/new" element={isAuthenticated() ? <UsersNew /> : <Navigate to="/login" />} />
                <Route path="/manage/user/:id" element={isAuthenticated() ? <User /> : <Navigate to="/login" />} />
                <Route path="/manage/user/:id/edit" element={isAuthenticated() ? <UserEdit /> : <Navigate to="/login" />} />
                <Route path="/manage/courses" element={isAuthenticated() ? <ManageCourses /> : <Navigate to="/login" />} />
                {/* Catch-all route for unmatched routes */}
                <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for unmatched routes */}
            </Route>
        </Routes>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {router}
    </React.StrictMode>
);