import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const Course = () => {
    const [course, setCourse] = useState({});
    let { semester, department, number, section } = useParams();
    const [loading, setLoading] = useState(true);

    const retrieveCourse = async () => {
        // modify semester to contain space between year and season
        for(let i = 0; i < semester.length; i++) {
            if (semester[i] === '2') {
                semester = semester.substring(0, i) + ' ' + semester.substring(i);
                break;
            }
        }

        // build the request payload
        const payload = {
            semester: semester,
            department: department,
            number: number,
            section: section
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Solve CORS issue
            body: JSON.stringify(payload)
        };

        const backendUrl = 'http://localhost:5000';
        const usersUrl = `${backendUrl}/course`;

        try {
            const response = await fetch(usersUrl, requestOptions)
            const data = await response.json();

            if (response.ok && Array.isArray(data) && data.length > 0) {
                console.log(data[0]); // Log the received user data
                setCourse(data[0]);     // Set the user state
            } else {
                console.log("Data fetch error:", data);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        retrieveCourse();
    }, [semester, department, number]);

    // Wait for user data to load before rendering
    useEffect(() => {
        if (Object.keys(course).length > 0) {
            setLoading(false);
        }
    }, [course]);

    function removeWhitespace(str) {
        return str.replace(/\s/g, '');
    }

    return(
        <div className="text-center">
            <h2>Courses</h2>
            <div className="col text-end">
                <Link to={`/courses/${course.department}/${course.number}/${course.section}/edit`}><span className="badge bg-primary">Edit course</span></Link>
                <Link to={`/courses`}><span className="badge bg-primary">Back</span></Link>
            </div>
            <hr />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="text-start">
                    <h2>{course.courseName}</h2>
                    <h3>{course.semester}</h3>
                    <small><em>{course.department} {course.number} ({course.section})</em></small>
                    <br />
                    <br />
                    <h4>Course Details</h4>
                    <p>Credits: {course.credits}</p>
                    <p>Day: {course.day}</p>
                    <p>Start Time: {course.startTime}</p>
                    <p>End Time: {course.endTime}</p>
                    <p>Instructor: {course.instructor}</p>
                    <p>Crn: {course.crn}</p>
                    <p>GenEd: {course.genEd}</p>
                    <p>Prior: {course.prior}</p>
                    <p>Special info: {course.specialInfo}</p>
                </div>
            )}
        </div>
    )
}

export default Course;