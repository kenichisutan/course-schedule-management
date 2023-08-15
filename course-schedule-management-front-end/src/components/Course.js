import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Course = () => {
    const [course, setCourse] = useState({});
    let { id } = useParams();

    useEffect(() => {
        let course = {
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
        };
        setCourse(course)
    }, [id])

    return(
        <div>
            <h2>{course.title}</h2>
            <small><em>{course.department}, {course.number}, ({course.section}), Credits: {course.credits}</em></small>
            <hr/>
            <p>{course.day}, {course.startTime}, - {course.endTime}</p>
            <p>{course.instructor}</p>
            <p>CRN: {course.crn}, GenED: {course.genEd}, Prior: {course.prior}, Special info: {course.info}</p>
        </div>
    )
}

export default Course;