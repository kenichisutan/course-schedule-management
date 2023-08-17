import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Courses = () => {
    const [selectedSemester, setSelectedSemester] = useState('Spring 2023');
    const [courses, setCourses] = useState([]);

    let timetableData;
    let timetableDataSpring;
    let timetableDataSummer;
    let timetableDataFall;

    const handleSemesterChange = () => {
        retrieveFromDatabase();
    };

    const updateSemester = (event) => {
        setSelectedSemester(event.target.value);
    }

    // Utilize database instead of hard-coded data

    const retrieveFromDatabase = () => {
        const payload = {
            semester: selectedSemester
        }

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Solve CORS issue
            body: JSON.stringify(payload)
        };

        const backendUrl = 'http://localhost:5000';
        const fillDatabaseUrl = `${backendUrl}/retrieve-course-data`;

        fetch(fillDatabaseUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(selectedSemester)
                // Convert object to array and set it as courses
                if(selectedSemester === 'Fall 2023') {
                    timetableDataFall = Object.values(data);
                    timetableData = timetableDataFall;
                } else if(selectedSemester === 'Spring 2023') {
                    timetableDataSpring = Object.values(data);
                    timetableData = timetableDataSpring;
                } else if(selectedSemester === 'Summer 2023') {
                    timetableDataSummer = Object.values(data);
                    timetableData = timetableDataSummer;
                }
                setCourses(timetableData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <>
            <div className="text-center">
                <h2>Courses</h2>
                <label htmlFor="semesterSelect">Select Semester: </label>
                <select class="form-select" aria-label="Default select example" id="semesterSelect"
                onChange={updateSemester}>
                    <option value="Spring 2023">Spring 2023</option>
                    <option value="Summer 2023">Summer 2023</option>
                    <option value="Fall 2023">Fall 2023</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={handleSemesterChange}>
                    Load semester
                </button>
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
                                <Link to={`/course/${course.courseName}`}>{course.courseName}</Link>
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