import {useState} from "react";
import Input from "./form/Input";
import "../styles.css";
import MultiInput from "./form/MultiInput";
import Checkbox from "./form/Checkbox";
import * as FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";

const New = () => {
    const [semester, setSemester] = useState("");
    const [classType, setClassType] = useState("");
    const [roomConfirm, setRoomConfirm] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [courseName, setCourseName] = useState("");
    const [number, setNumber] = useState("");
    const [section, setSection] = useState("");
    const [credits, setCredits] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [instructor, setInstructor] = useState("");
    const [instructorConfirm, setInstructorConfirm] = useState(false);
    const [crn, setCrn] = useState("");
    const [genEd, setGenEd] = useState("");
    const [prior, setPrior] = useState("");
    const [specialInfo, setSpecialInfo] = useState("");

    // Retrieve from database
    const [isSemesterSelected, setIsSemesterSelected] = useState(false);
    const [courses, setCourses] = useState([]);

    let coursesDataSpring;
    let coursesDataSummer;
    let coursesDataFall;

    let courseData;

    const retrieveFromDatabase = () => {
        const payload = {
            semester: semester
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
                // Convert object to array and set it as courses
                if(semester === 'Fall 2023') {
                    coursesDataFall = Object.values(data);
                    courseData = coursesDataFall;
                } else if(semester === 'Spring 2023') {
                    coursesDataSpring = Object.values(data);
                    courseData = coursesDataSpring;
                } else if(semester === 'Summer 2023') {
                    coursesDataSummer = Object.values(data);
                    courseData = coursesDataSummer;
                }
                setCourses(courseData);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const semesterOptions = [
        { value: "Spring 2023", label: "Spring 2023" },
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
        {'value': 'ACCT', 'label': 'Accounting'},
        {'value': 'AS', 'label': 'Actuarial Science'},
        {'value': 'AOD', 'label': 'Adult & Organizational Development'},
        {'value': 'ACMS', 'label': 'Advanced Core Medical Science'},
        {'value': 'ADVE', 'label': 'Advanced Education'},
        {'value': 'ADV', 'label': 'Advertising'},
        {'value': 'AIRF', 'label': 'Aerospace Studies - Air Force ROTC'},
        {'value': 'AAAS', 'label': 'Africology and African American Studies'},
        {'value': 'AMST', 'label': 'American Studies'},
        {'value': 'Medical School', 'label': 'Anatomy & Cell Biology'},
        {'value': 'ANES', 'label': 'Anesthesiology'},
        {'value': 'ANTH', 'label': 'Anthropology'},
        {'value': 'ABA', 'label': 'Applied Behavior Analysis'},
        {'value': 'ARBC', 'label': 'Arabic'},
        {'value': 'ARCH', 'label': 'Architecture'},
        {'value': 'ART', 'label': 'Art'},
        {'value': 'ARTU', 'label': 'Art - Japan Campus'},
        {'value': 'ARTE', 'label': 'Art Education'},
        {'value': 'ARTH', 'label': 'Art History'},
        {'value': 'ARTT', 'label': 'Art Therapy'},
        {'value': 'ASST', 'label': 'Asian Studies'},
        {'value': 'ATHT', 'label': 'Athletic Training'},
        {'value': 'BCMS', 'label': 'Basic Core Medical Science'},
        {'value': 'BIOE', 'label': 'Bioengineering'},
        {'value': 'BIOL', 'label': 'Biology'},
        {'value': 'Medical', 'label': 'Biomedical Sciences'},
        {'value': 'PBMS', 'label': 'Biomedical Studies'},
        {'value': 'BOT', 'label': 'Botany'},
        {'value': 'BCMD', 'label': 'Boyer College of Music & Dance'},
        {'value': 'BA', 'label': 'Business Administration'},
        {'value': 'BSED', 'label': 'Business Education'},
        {'value': 'CTE', 'label': 'Career and Technical Education'},
        {'value': 'CFA', 'label': 'Center for the Performing and Cinematic Arts'},
        {'value': 'CHEM', 'label': 'Chemistry'},
        {'value': 'CHI', 'label': 'Chinese'},
        {'value': 'CTRP', 'label': 'City and Regional Planning'},
        {'value': 'CEE', 'label': 'Civil Engineering'},
        {'value': 'CSHI', 'label': 'Clinical Sciences and Health Informatics'},
        {'value': 'COED', 'label': 'College of Education'},
        {'value': 'CLA', 'label': 'College of Liberal Arts'},
        {'value': 'CHP', 'label': 'College of Public Health & School of Social Work'},
        {'value': 'SCTC', 'label': 'College of Science and Technology'},
        {'value': 'CSI', 'label': 'Communication and Social Influence'},
        {'value': 'CMGT', 'label': 'Communication Management'},
        {'value': 'CSCD', 'label': 'Communication Sciences and Disorders'},
        {'value': 'CMST', 'label': 'Communication Studies'},
        {'value': 'COMM', 'label': 'Communications and Theater'},
        {'value': 'CART', 'label': 'Community Arts'},
        {'value': 'CDEV', 'label': 'Community Development'},
        {'value': 'PCHA', 'label': 'Community Health and Aging'},
        {'value': 'CIS', 'label': 'Computer & Information Science'},
        {'value': 'CNCM', 'label': 'Conflict and Communication'},
        {'value': 'CMT', 'label': 'Construction Management Technology'},
        {'value': 'CPSY', 'label': 'Counseling Psychology'},
        {'value': 'CJ', 'label': 'Criminal Justice'},
        {'value': 'CRIT', 'label': 'Critical Languages Center'},
        {'value': 'CLST', 'label': 'Cultural Studies'},
        {'value': 'DANC', 'label': 'Dance'},
        {'value': 'DPHS', 'label': 'Dental Public Health Sciences'},
        {'value': 'DERM', 'label': 'Dermatology'},
        {'value': 'DSST', 'label': 'Disability Studies'},
        {'value': 'DSED', 'label': 'Distributive Education'},
        {'value': 'ECED', 'label': 'Early Childhood Education'},
        {'value': 'EES', 'label': 'Earth & Environmental Science'},
        {'value': 'ECON', 'label': 'Economics'},
        {'value': 'EDUC', 'label': 'Education'},
        {'value': 'EDAD', 'label': 'Educational Administration'},
        {'value': 'EPSY', 'label': 'Educational Psychology'},
        {'value': 'ECE', 'label': 'Electrical Engineering'},
        {'value': 'EET', 'label': 'Electrical Engineering Technology'},
        {'value': 'ELED', 'label': 'Elementary Education'},
        {'value': 'EMMD', 'label': 'Emergency Medicine'},
        {'value': 'ENGR', 'label': 'Engineering'},
        {'value': 'General', 'label': 'Engineering'},
        {'value': 'EMGT', 'label': 'Engineering Management'},
        {'value': 'ENGT', 'label': 'Engineering Technology'},
        {'value': 'ENG', 'label': 'English'},
        {'value': 'Elementary', 'label': 'English Education'},
        {'value': 'Secondary', 'label': 'English Education'},
        {'value': 'ENVT', 'label': 'Environmental Engineering Technology'},
        {'value': 'ENVH', 'label': 'Environmental Health'},
        {'value': 'CST', 'label': 'Environmental Science'},
        {'value': 'CLA', 'label': 'Environmental Studies'},
        {'value': 'EPBI', 'label': 'Epidemiology and Biostatistics'},
        {'value': 'FAMP', 'label': 'Family & Community Medicine'},
        {'value': 'FMA', 'label': 'Film and Media Arts'},
        {'value': 'FIN', 'label': 'Finance'},
        {'value': 'FLED', 'label': 'Foreign Language Ed-Secondary'},
        {'value': 'FDPR', 'label': 'Foundation Program'},
        {'value': 'FREN', 'label': 'French'},
        {'value': 'GSWS', 'label': "Gender, Sexuality and Women's Studies"},
        {'value': 'GUS', 'label': 'Geography and Urban Studies'},
        {'value': 'GER', 'label': 'German'},
        {'value': 'GBST', 'label': 'Global Studies'},
        {'value': 'GDC', 'label': 'Globalization and Development Communication'},
        {'value': 'ADVG', 'label': 'Graduate Advanced Education and General Dentistry'},
        {'value': 'ENDG', 'label': 'Graduate Endodontic'},
        {'value': 'ORTG', 'label': 'Graduate Orthodontics'},
        {'value': 'PERG', 'label': 'Graduate Periodontics'},
        {'value': 'GAD', 'label': 'Graphic Arts and Design'},
        {'value': 'Ancient', 'label': 'Greek'},
        {'value': 'Modern', 'label': 'Greek'},
        {'value': 'GRC', 'label': 'Greek and Roman Classics'},
        {'value': 'HIM', 'label': 'Health Information Management'},
        {'value': 'HPM', 'label': 'Health Policy and Management'},
        {'value': 'HRPR', 'label': 'Health Related Professions'},
        {'value': 'HCM', 'label': 'Healthcare Management'},
        {'value': 'HEBR', 'label': 'Hebrew'},
        {'value': 'HIED', 'label': 'Higher Education'},
        {'value': 'HIN', 'label': 'Hindi'},
        {'value': 'HIST', 'label': 'History'},
        {'value': 'HNRS', 'label': 'Honors Program'},
        {'value': 'HORT', 'label': 'Horticulture'},
        {'value': 'HDCE', 'label': 'Human Development and Community Engagement'},
        {'value': 'HRM', 'label': 'Human Resource Management'},
        {'value': 'HS', 'label': 'Human Services'},
        {'value': 'ISE', 'label': 'Industrial and Systems Engineering'},
        {'value': 'ILT', 'label': 'Instructional Learning Technology'},
        {'value': 'IH', 'label': 'Intellectual Heritage'},
        {'value': 'INTM', 'label': 'Internal Medicine'},
        {'value': 'IB', 'label': 'International Business Administration'},
        {'value': 'ITA', 'label': 'International Teaching Assistants'},
        {'value': 'ITAL', 'label': 'Italian'},
        {'value': 'JPNS', 'label': 'Japanese'},
        {'value': 'JST', 'label': 'Jewish Studies'},
        {'value': 'JRN', 'label': 'Journalism'},
        {'value': 'JUSI', 'label': 'Juridical Science'},
        {'value': 'JUDO', 'label': 'Juris Doctor'},
        {'value': 'KINS', 'label': 'Kinesiology'},
        {'value': 'KLN', 'label': 'Klein College of Media and Communication'},
        {'value': 'KRN', 'label': 'Korean'},
        {'value': 'LARC', 'label': 'Landscape Architecture'},
        {'value': 'LAT', 'label': 'Latin'},
        {'value': 'LAS', 'label': 'Latin American Studies'},
        {'value': 'LAWU', 'label': 'Law - Undergraduate Courses'},
        {'value': 'LGLS', 'label': 'Legal Studies'},
        {'value': 'LGBT', 'label': 'Lesbian, Gay, Bisexual and Transgender Studies'},
        {'value': 'MLAI', 'label': 'LLM American & International'},
        {'value': 'MLFF', 'label': 'LLM Freedman Fellows'},
        {'value': 'MLTX', 'label': 'LLM Taxation'},
        {'value': 'MLTA', 'label': 'LLM Trial Advocacy'},
        {'value': 'MIS', 'label': 'Management Information Systems'},
        {'value': 'MSOM', 'label': 'Management Science/Operations Management'},
        {'value': 'MKTG', 'label': 'Marketing'},
        {'value': 'MLA', 'label': 'Master of Liberal Arts'},
        {'value': 'Elementary', 'label': 'Math Education'},
        {'value': 'Secondary', 'label': 'Math Education'},
        {'value': 'MATH', 'label': 'Mathematics'},
        {'value': 'MEE', 'label': 'Mechanical Engineering'},
        {'value': 'MET', 'label': 'Mechanical Engineering Technology'},
        {'value': 'MMC', 'label': 'Media and Communication'},
        {'value': 'MSP', 'label': 'Media Studies & Production'},
        {'value': 'MEDU', 'label': 'Medicine Undergraduate Courses'},
        {'value': 'MGSE', 'label': 'Middle Grades & Secondary Education'},
        {'value': 'MGRE', 'label': 'Middle Grades Education'},
        {'value': 'MLSC', 'label': 'Military Science'},
        {'value': 'MUSC', 'label': 'Music'},
        {'value': 'MUED', 'label': 'Music Education'},
        {'value': 'MUST', 'label': 'Music Studies'},
        {'value': 'NMED', 'label': 'Narrative Medicine'},
        {'value': 'NAVS', 'label': 'Naval Science - Navy ROTC'},
        {'value': 'NEUR', 'label': 'Neurology'},
        {'value': 'NMS', 'label': 'Neuromotor Science'},
        {'value': 'NSCI', 'label': 'Neuroscience - CLA'},
        {'value': 'NESU', 'label': 'Neurosurgery'},
        {'value': 'NMIC', 'label': 'New Media Interdisciplinary'},
        {'value': 'NURS', 'label': 'Nursing'},
        {'value': 'NUTR', 'label': 'Nutrition'},
        {'value': 'OBGY', 'label': 'Obstetrics, Gynecology & Reproduction'},
        {'value': 'OTHR', 'label': 'Occupational Therapy'},
        {'value': 'OPHT', 'label': 'Ophthalmology'},
        {'value': 'ORBG', 'label': 'Oral Biology'},
        {'value': 'OHSC', 'label': 'Oral Health Sciences'},
        {'value': 'ORTS', 'label': 'Orthopedic Surgery'},
        {'value': 'OTOR', 'label': 'Otorhinology'},
        {'value': 'PATH', 'label': 'Pathology & Lab Medicine'},
        {'value': 'PEDI', 'label': 'Pediatrics'},
        {'value': 'PS', 'label': 'Pharmaceutical Sciences'},
        {'value': 'PP', 'label': 'Pharmacy Practice'},
        {'value': 'QARA', 'label': 'Pharmacy Quality Assurance'},
        {'value': 'PHIL', 'label': 'Philosophy'},
        {'value': 'PHTH', 'label': 'Physical Therapy'},
        {'value': 'PA', 'label': 'Physician Assistant'},
        {'value': 'PHYS', 'label': 'Physics'},
        {'value': 'PHBI', 'label': 'Physiology-Biophysics'},
        {'value': 'PCED', 'label': 'Podiatric Clinical Education'},
        {'value': 'PDID', 'label': 'Podiatric Interdepartmental'},
        {'value': 'PDMD', 'label': 'Podiatric Medicine'},
        {'value': 'PDOR', 'label': 'Podiatric Orthopedics'},
        {'value': 'PDSR', 'label': 'Podiatric Surgery'},
        {'value': 'POLS', 'label': 'Political Science'},
        {'value': 'PORT', 'label': 'Portuguese'},
        {'value': 'PRAN', 'label': 'ProRanger Program'},
        {'value': 'PSYM', 'label': 'Psychiatry & Behavioral Science'},
        {'value': 'PSY', 'label': 'Psychology'},
        {'value': 'PLCY', 'label': 'Public Policy'},
        {'value': 'PR', 'label': 'Public Relations'},
        {'value': 'RAON', 'label': 'Radiation Oncology'},
        {'value': 'RADI', 'label': 'Radiology'},
        {'value': 'RE', 'label': 'Real Estate'},
        {'value': 'RCTH', 'label': 'Recreational Therapy'},
        {'value': 'RHMD', 'label': 'Rehabilitation Medicine'},
        {'value': 'REHB', 'label': 'Rehabilitation Sciences'},
        {'value': 'REL', 'label': 'Religion'},
        {'value': 'RDNT', 'label': 'Restorative Dentistry'},
        {'value': 'RMI', 'label': 'Risk Management and Insurance'},
        {'value': 'RUS', 'label': 'Russian'},
        {'value': 'SBM', 'label': 'School of Business and Management'},
        {'value': 'DENT', 'label': 'School of Dentistry'},
        {'value': 'MEDS', 'label': 'School of Medicine'},
        {'value': 'STHA', 'label': 'School of Sport, Tourism & Hospitality Management'},
        {'value': 'SPSY', 'label': 'School Psychology'},
        {'value': 'Elementary', 'label': 'Science Education'},
        {'value': 'Secondary', 'label': 'Science Education'},
        {'value': 'SCSE', 'label': 'Science, Secondary Education'},
        {'value': 'SECE', 'label': 'Secondary Education'},
        {'value': 'SLVC', 'label': 'Slavic Languages & Literature'},
        {'value': 'SBS', 'label': 'Social and Behavioral Sciences'},
        {'value': 'Elementary', 'label': 'Social Studies Education'},
        {'value': 'Secondary', 'label': 'Social Studies Education'},
        {'value': 'SSWG', 'label': 'Social Work - Graduate'},
        {'value': 'SSWU', 'label': 'Social Work - Undergraduate'},
        {'value': 'SOC', 'label': 'Sociology'},
        {'value': 'SPAN', 'label': 'Spanish'},
        {'value': 'SPED', 'label': 'Special Education'},
        {'value': 'SRM', 'label': 'Sport and Recreation Management'},
        {'value': 'STHM', 'label': 'Sport, Tourism and Hospitality Management'},
        {'value': 'STAT', 'label': 'Statistics'},
        {'value': 'STRC', 'label': 'Strategic Communication'},
        {'value': 'SGM', 'label': 'Strategic Management'},
        {'value': 'STAW', 'label': 'Study Away Non-TU Program'},
        {'value': 'SUPV', 'label': 'Supervisory Certification Prog'},
        {'value': 'SCM', 'label': 'Supply Chain Management'},
        {'value': 'SURG', 'label': 'Surgery'},
        {'value': 'TESL', 'label': 'Teaching English to Speakers of Other Languages'},
        {'value': 'TUJ', 'label': 'Temple University Japan'},
        {'value': 'THTR', 'label': 'Theater'},
        {'value': 'TFMA', 'label': 'Theater, Film and Media Arts'},
        {'value': 'THRC', 'label': 'Therapeutic Recreation'},
        {'value': 'TS', 'label': 'Topical Studies'},
        {'value': 'THM', 'label': 'Tourism and Hospitality Management'},
        {'value': 'JIBS', 'label': 'TUJ International Business Studies'},
        {'value': 'TYLE', 'label': 'Tyler School of Art'},
        {'value': 'USMS', 'label': 'Undergraduate Studies Merit Scholar'},
        {'value': 'UC', 'label': 'University College'},
        {'value': 'UNVS', 'label': 'University Seminar'},
        {'value': 'HONS', 'label': 'Upper Division Honors Program'},
        {'value': 'UBTH', 'label': 'Urban Bioethics'},
        {'value': 'URBE', 'label': 'Urban Education'},
        {'value': 'UROL', 'label': 'Urology'},
        {'value': 'VS', 'label': 'Visual Studies'},
    ];

    const genEdOptions = [
        { value: "", label: "None" },
        { value: "GW", label: "Analytical Reading & Writing" },
        { value: "GQ", label: "Quantitative Literacy" },
        { value: "GY", label: "Intellectual Heritage I" },
        { value: "GZ", label: "Intellectual Heritage II" },
        { value: "GA", label: "Arts" },
        { value: "GB", label: "Human Behavior" },
        { value: "GD", label: "Race & Diversity" },
        { value: "GG", label: "World Society" },
        { value: "GS", label: "Science & Technology" },
        { value: "GU", label: "U.S. Society" },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted")
        console.log(semester, classType, roomConfirm, roomNumber, department, courseName, number, section, credits,
            day, startTime, endTime, instructor, instructorConfirm, crn, genEd, prior, specialInfo)

        // build the request payload
        let payload = {
            [department + number + section]: {
                semester: semester,
                // find relevant department name from departmentOptions
                subject: department ? departmentOptions.find((option) => option.value === department).label : null,
                department: department ? department.trim() : null,
                number: number ? number.trim() : null,
                section: section ? section.trim() : null,
                courseName: courseName ? courseName.trim() : null,
                credits: credits ? credits.trim() : null,
                day: day ? day.trim() : null,
                startTime: startTime ? startTime.trim() : null,
                endTime: endTime ? endTime.trim() : null,
                instructor: instructor ? instructor.trim() : null,
                crn: crn ? crn.trim() : null,
                genEd: genEd ? genEd.trim() : null,
                prior: prior ? prior.trim() : null,
                specialInfo: specialInfo ? specialInfo.trim() : null,
            }
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
        const authenticateUrl = `${backendUrl}/insert-course`;

        fetch(authenticateUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    alert("Course successfully added!");
                } else {
                    alert("Course not added. " + data.message + " Please try again.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Course not added. Please try again.");
            }
        );

        // // Excel export
        // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        // const fileExtension = '.xlsx';
        // const fileName = 'courses';
        //
        // const ws = XLSX.utils.json_to_sheet(payload);
        // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // const data = new Blob([excelBuffer], { type: fileType });
        // FileSaver.saveAs(data, fileName + fileExtension);
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
                    onChange={(event) => {
                        setSemester(event.target.value)
                        setIsSemesterSelected(true)
                        retrieveFromDatabase();
                    }}
                    options={semesterOptions}
                    value={semester}
                />
                {/* Remove bottom part when isSemesterSelected is false */}
                {isSemesterSelected && (
                    <>
                        <MultiInput
                            title="Select a class type"
                            className="form-select"
                            name="classTypeCombobox"
                            onChange={(event) => setClassType(event.target.value)}
                            options={classTypeOptions}
                            value={classType}
                        />
                        {/*TODO: remove the need for a checkbox when selecting online*/}
                        <Checkbox
                            title="Has a room been secured with facilities?"
                            message="Please secure a room with facilities before submitting this form."
                            onChange={(event) => {
                                console.log("Checkbox clicked");
                                setRoomConfirm(event.target.checked);
                            }}
                        />

                        <Input
                            title="Room Number"
                            type="room-number"
                            className="form-control"
                            name="room-number"
                            autoComplete="room-number-new"
                            onChange={(event) => setRoomNumber(event.target.value)}
                        />
                        {/*TODO: create a list of options of departments from an existing file*/}
                        <MultiInput
                            title="Select a department"
                            className="form-select"
                            name="departmentCombobox"
                            onChange={(event) => setDepartment(event.target.value)}
                            options={departmentOptions}
                            value={department}
                        />
                        {/*TODO: update so that while typing suggestions of existing courses should be displayed*/}
                        {/*TODO: update so that if a course already previously exist, autofill the fields with the past entry*/}
                        <Input
                            title="Course Title"
                            type="course-title"
                            className="form-control"
                            name="course-title"
                            autoComplete="course-title-new"
                            onChange={(event) => setCourseName(event.target.value)}
                        />
                        <Input
                            title="Course Number"
                            type="course-number"
                            className="form-control"
                            name="course-number"
                            autoComplete="course-number-new"
                            onChange={(event) => setNumber(event.target.value)}
                        />
                        <Input
                            title="Section Number"
                            type="section-number"
                            className="form-control"
                            name="section-number"
                            autoComplete="section-number-new"
                            onChange={(event) => setSection(event.target.value)}
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
                            onChange={(event) => {
                                console.log("Checkbox clicked");
                                setInstructorConfirm(event.target.checked);
                            }}
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
                            value={genEd}
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
                            onChange={(event) => setSpecialInfo(event.target.value)}
                        />
                    </>
                )}
                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add"
                />
            </form>
        </div>
    );
}

export default New;