import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {timetableDataFall} from "../data/TimetableDataFall";
import {timetableDataSpring} from "../data/TimetableDataSpring";
import {timetableDataSummer} from "../data/TimetableDataSummer";


const ManageCourses = () => {
    const [admin, setAdmin] = useState(false);
    const [springCourses, setSpringCourses] = useState([]);
    const [summerCourses, setSummerCourses] = useState([]);
    const [fallCourses, setFallCourses] = useState([]);

    const fillDatabase = () => {
        const timetableDataSpringArray = Object.values(timetableDataSpring);
        const timetableDataSummerArray = Object.values(timetableDataSummer);
        const timetableDataFallArray = Object.values(timetableDataFall);

        setSpringCourses(timetableDataSpringArray);
        setSummerCourses(timetableDataSummerArray);
        setFallCourses(timetableDataFallArray);

        let springCoursesPayload = {};
        let summerCoursesPayload = {};
        let fallCoursesPayload = {};
        // Create JSON payload of courses
        springCourses.map( (springCourse) => {
            springCoursesPayload = {
                ...springCoursesPayload,
                [springCourse.department + springCourse.number + springCourse.section]: {
                    semester: "Spring 2023",
                    subject: springCourse.subject ? springCourse.subject.trim() : null, // Apply trim if not null
                    department: springCourse.department ? springCourse.department.trim() : null,
                    number: springCourse.number ? springCourse.number.trim() : null,
                    section: springCourse.section ? springCourse.section.trim() : null,
                    courseName: springCourse.courseName ? springCourse.courseName.trim() : null,
                    credits: springCourse.credits ? springCourse.credits.trim() : null,
                    day: springCourse.day ? springCourse.day.trim() : null,
                    startTime: springCourse.startTime ? springCourse.startTime.trim() : null,
                    endTime: springCourse.endTime ? springCourse.endTime.trim() : null,
                    instructor: springCourse.instructor ? springCourse.instructor.trim() : null,
                    crn: springCourse.crn ? springCourse.crn.trim() : null,
                    genEd: springCourse.genEd ? springCourse.genEd.trim() : null,
                    prior: springCourse.prior ? springCourse.prior.trim() : null,
                    specialInfo: springCourse.specialInfo ? springCourse.specialInfo.trim() : null,

                }
            }
        });
        summerCourses.map( (summerCourse) => {
            summerCoursesPayload = {
                ...summerCoursesPayload,
                [summerCourse.department + summerCourse.number + summerCourse.section]: {
                    semester: "Summer 2023",
                    subject: summerCourse.subject ? summerCourse.subject.trim() : null,
                    department: summerCourse.department ? summerCourse.department.trim() : null,
                    number: summerCourse.number ? summerCourse.number.trim() : null,
                    section: summerCourse.section ? summerCourse.section.trim() : null,
                    courseName: summerCourse.courseName ? summerCourse.courseName.trim() : null,
                    credits: summerCourse.credits ? summerCourse.credits.trim() : null,
                    day: summerCourse.day ? summerCourse.day.trim() : null,
                    startTime: summerCourse.startTime ? summerCourse.startTime.trim() : null,
                    endTime: summerCourse.endTime ? summerCourse.endTime.trim() : null,
                    instructor: summerCourse.instructor ? summerCourse.instructor.trim() : null,
                    crn: summerCourse.crn ? summerCourse.crn.trim() : null,
                    genEd: summerCourse.genEd ? summerCourse.genEd.trim() : null,
                    prior: summerCourse.prior ? summerCourse.prior.trim() : null,
                    specialInfo: summerCourse.specialInfo ? summerCourse.specialInfo.trim() : null,
                }
            }
        });
        fallCourses.map( (fallCourse) => {
            fallCoursesPayload = {
                ...fallCoursesPayload,
                [fallCourse.department + fallCourse.number + fallCourse.section]: {
                    semester: "Fall 2023",
                    subject: fallCourse.subject ? fallCourse.subject.trim() : null,
                    department: fallCourse.department ? fallCourse.department.trim() : null,
                    number: fallCourse.number ? fallCourse.number.trim() : null,
                    section: fallCourse.section ? fallCourse.section.trim() : null,
                    courseName: fallCourse.courseName ? fallCourse.courseName.trim() : null,
                    credits: fallCourse.credits ? fallCourse.credits.trim() : null,
                    day: fallCourse.day ? fallCourse.day.trim() : null,
                    startTime: fallCourse.startTime ? fallCourse.startTime.trim() : null,
                    endTime: fallCourse.endTime ? fallCourse.endTime.trim() : null,
                    instructor: fallCourse.instructor ? fallCourse.instructor.trim() : null,
                    crn: fallCourse.crn ? fallCourse.crn.trim() : null,
                    genEd: fallCourse.genEd ? fallCourse.genEd.trim() : null,
                    prior: fallCourse.prior ? fallCourse.prior.trim() : null,
                    specialInfo: fallCourse.specialInfo ? fallCourse.specialInfo.trim() : null,
                }
            }
        });

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Solve CORS issue
            body: JSON.stringify(springCoursesPayload)
        };

        const backendUrl = 'http://localhost:5000';
        const fillDatabaseUrl = `${backendUrl}/insert-course`;

        fetch(fillDatabaseUrl, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data.message);
                requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Solve CORS issue
                    body: JSON.stringify(summerCoursesPayload)
                };
                fetch(fillDatabaseUrl, requestOptions)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data.message);
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include', // Solve CORS issue
                            body: JSON.stringify(fallCoursesPayload)
                        };
                        fetch(fillDatabaseUrl, requestOptions)
                            .then(response => response.json())
                            .then((data) => {
                                console.log(data.message);
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    }
                )
            })
            .catch(error => {
                console.log(error)
            })
        }

    const handleAdminCheck = async () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include', // Solve CORS issue
        };

        const backendUrl = 'http://localhost:5000';
        const adminUrl = `${backendUrl}/admin`;

        try {
            const response = await fetch(adminUrl, requestOptions)

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setAdmin(data.success);
            } else {
                setAdmin(false);
            }
        } catch (error) {
            setAdmin(false)
        }
    };

    useEffect(() => {
        handleAdminCheck();
        return () => {
        };
    }, []);

    return (
        <>
            <div className="text-center">
                <h2>Manage Courses</h2>
                <div className="col text-end">
                    <Link to={`/manage/`}><span className="badge bg-primary">Back</span></Link>
                </div>
                <hr />
                {/* if admin is true, display the following */}
                {admin ? (
                    <div className="col-md-2">
                        <div className="list-group">
                            <button type="button" className="btn btn-primary" onClick={fillDatabase}>
                                Fill database (DO NOT PRESS UNLESS YOU KNOW WHAT YOU ARE DOING)
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2>Unauthorized</h2>
                    </div>
                )}
            </div>
        </>
    );
}

export default ManageCourses;