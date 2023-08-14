import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {timetableDataFall} from "../data/TimetableDataFall";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Convert object to array and set it as courses
        const timetableDataFallArray = Object.values(timetableDataFall);
        setCourses(timetableDataFallArray);
    }, [])

    return(
        <>
            <div className="text-center">
                <h2>Courses</h2>
                <hr />
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Credits</th>
                        <th>Day & Time</th>
                        <th>Instructor</th>
                        <th>CRN</th>
                        <th>GenEd</th>
                        <th>Prior</th>
                        <th>Special Info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map( (course) =>
                        <tr key={course.id}>
                            <td>
                                <Link to={`/department/${course.department}`}>{course.subject}</Link>
                            </td>
                            <td>{course.department} {course.number}</td>
                            <td>
                                <Link to={`/course/${course.id}`}>{course.courseName}</Link>
                            </td>
                            <td>{course.credits}</td>
                            <td>{course.day} {course.startTime} - {course.endTime}</td>
                            <td>{course.instructor}</td>
                            <td>{course.crn}</td>
                            <td>{course.genEd}</td>
                            <td>{course.prior}</td>
                            <td>{course.info}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Courses;