import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import New from './components/New';
import Update from './components/Update';
import Cancel from './components/Cancel';
import ErrorPage from './components/ErrorPage';
import Courses from './components/Courses';

const router = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} errorElement={<ErrorPage />}>
                <Route index element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/update" element={<Update />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/courses" element={<Courses />} />
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