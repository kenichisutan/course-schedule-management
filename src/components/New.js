import { useState } from "react";
import Input from "./form/Input";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import MultiInput from "./form/MultiInput";
import Checkbox from "./form/Checkbox";

const New = () => {
    const [semester, setSemester] = useState("");
    const [classType, setClassType] = useState("");
    const [roomConfirm, setRoomConfirm] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [courseNumber, setCourseNumber] = useState("");
    const [sectionNumber, setSectionNumber] = useState("");
    const [credits, setCredits] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [instructor, setInstructor] = useState("");
    const [instructorConfirm, setInstructorConfirm] = useState("");
    const [crn, setCrn] = useState("");
    const [genEd, setGenEd] = useState("");
    const [prior, setPrior] = useState("");
    const [info, setInfo] = useState("");

    const navigate = useNavigate();

    const semesterOptions = [
        { value: "Summer 2023", label: "Summer 2023" },
        { value: "Fall 2023", label: "Fall 2023" },
        { value: "Spring 2024", label: "Spring 2024" }
    ];

    const classTypeOptions = [
        { value: "In-Person", label: "In-Person" },
        { value: "Online", label: "Online" },
        { value: "Hybrid", label: "Hybrid" }
    ];

    const departmentOptions = [
        { value: "CIS", label: "Computer and Information Science" },
        { value: "MATH", label: "Mathematics" },
        { value: "PHYS", label: "Physics" }
    ];

    const genEdOptions = [
        { value: "", label: "None" },
        { value: "GQ", label: "GQ" },
        { value: "GD", label: "GD" },
        { value: "GA", label: "GA" },
        { value: "GB", label: "GB" },
        { value: "GS", label: "GS" },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        // build the request payload
        let payload = {
            semester: semester, // fall, spring, or summer and year
            classType: classType, // online or in-person
            roomNumber: roomNumber, // room number if in-person
            department: department, // department title
            courseTitle: courseTitle, // course title
            courseNumber: courseNumber, // course number
            sectionNumber: sectionNumber, // section number
            credits: credits, // number of credits
            day: day, // day of the week
            startTime: startTime, // start time
            endTime: endTime, // end time
            instructor: instructor, // instructor name
            instructorConfirm: instructorConfirm, // hire confirmation
            crn: crn, // course registration number
            genEd: genEd, // general education requirement
            prior: prior, // prerequisite
            info: info, // special info
        }
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Add a new course</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
                <MultiInput
                    title="Select a semester"
                    className="form-select"
                    name="semesterCombobox"
                    onChange={(event) => setSemester(event.target.value)}
                    options={semesterOptions}
                />
                <MultiInput
                    title="Select a class type"
                    className="form-select"
                    name="classTypeCombobox"
                    onChange={(event) => setClassType(event.target.value)}
                    options={classTypeOptions}
                />
                {/*TODO: remove the need for a checkbox when selecting online*/}
                <Checkbox
                    title="Has a room been secured with facilities?"
                    message="Please secure a room with facilities before submitting this form."
                    onChange={(event) => setRoomConfirm(event.target.checked)}
                />
                <MultiInput
                    title="Select a department"
                    className="form-select"
                    name="departmentCombobox"
                    onChange={(event) => setDepartment(event.target.value)}
                    options={departmentOptions}
                />
                <Input
                    title="Course Title"
                    type="course-title"
                    className="form-control"
                    name="course-title"
                    autoComplete="course-title-new"
                    onChange={(event) => setCourseTitle(event.target.value)}
                />
                <Input
                    title="Course Number"
                    type="course-number"
                    className="form-control"
                    name="course-number"
                    autoComplete="course-number-new"
                    onChange={(event) => setCourseNumber(event.target.value)}
                />
                <Input
                    title="Section Number"
                    type="section-number"
                    className="form-control"
                    name="section-number"
                    autoComplete="section-number-new"
                    onChange={(event) => setSectionNumber(event.target.value)}
                />
                <Input
                    title="Credits"
                    type="credits"
                    className="form-control"
                    name="credits"
                    autoComplete="credits-new"
                    onChange={(event) => setCredits(event.target.value)}
                />
                <Input
                    title="Day"
                    type="day"
                    className="form-control"
                    name="day"
                    autoComplete="day-new"
                    onChange={(event) => setDay(event.target.value)}
                />
                <Input
                    title="Start Time"
                    type="start-time"
                    className="form-control"
                    name="start-time"
                    autoComplete="start-time-new"
                    onChange={(event) => setStartTime(event.target.value)}
                />
                <Input
                    title="End Time"
                    type="end-time"
                    className="form-control"
                    name="end-time"
                    autoComplete="end-time-new"

                    onChange={(event) => setEndTime(event.target.value)}
                />
                <Input
                    title="Instructor"
                    type="instructor"
                    className="form-control"
                    name="instructor"
                    autoComplete="instructor-new"
                    onChange={(event) => setInstructor(event.target.value)}
                />
                <Checkbox
                    title="Has the instructor been approved as a new hire by the ADAA / is a current faculty member?"
                    message="Please confirm the instructor before submitting this form."
                    onChange={(event) => setInstructorConfirm(event.target.checked)}
                />
                <Input
                    title="CRN"
                    type="crn"
                    className="form-control"
                    name="crn"
                    autoComplete="crn-new"
                    onChange={(event) => setCrn(event.target.value)}
                />
                <MultiInput
                    title="Select a general education requirement"
                    className="form-select"
                    name="genEdCombobox"
                    onChange={(event) => setGenEd(event.target.value)}
                    options={genEdOptions}
                />
                <Input
                    title="Prerequisite"
                    type="prior"
                    className="form-control"
                    name="prior"
                    autoComplete="prior-new"
                    onChange={(event) => setPrior(event.target.value)}
                />
                <Input
                    title="Special Info"
                    type="info"
                    className="form-control"
                    name="info"
                    autoComplete="info-new"
                    onChange={(event) => setInfo(event.target.value)}
                />
                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                />
            </form>
        </div>
    );
}

export default New;