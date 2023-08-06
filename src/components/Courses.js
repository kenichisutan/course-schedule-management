import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Games = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const data = [
            {
                id: 1,
                departmentTitle: "Computer and Information Science",
                department: "CIS",
                number: 1051,
                section: 801,
                title: "Computer Programming in C",
                credits: 4,
                day: "MWF",
                startTime: "10:00",
                endTime: "11:20",
                instructor: "Karam, H",
                crn: 52434,
                genEd: null,
                prior: null,
                info: null,
            },
        ]
        setCourses(data)
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
                                <Link to={`/department/${course.department}`}>{course.departmentTitle}</Link>
                            </td>
                            <td>{course.department} {course.number}</td>
                            <td>
                                <Link to={`/course/${course.id}`}>{course.title}</Link>
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

export default Games;