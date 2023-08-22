// TODO: Update existing code to simultaneously create a JSON file containing a list of all departmentGenEds
// TODO: Update existing code to simultaneously create a JSON file containing a list of all GenED options

// Define an object containing the timetable data


const puppeteer = require('puppeteer');
const fs = require('fs');

async function launchPuppeteerSpring() {
    let inputData = ['Class Info'];
    let departmentGenEd = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/spring2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData
        // console.log("inputData:" + inputData + "\n");

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];

        // split by whitespace
        let [department, number, section] = [null, null, null];
        if(courseCode) {
             [department, number, section] = courseCode.split(" ");
        }

        // remove () from section start and end

        if(section) {
            section = section.replace(/\(/g, "");
            section = section.replace(/\)/g, "");
        }

        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];

        let [day, times, startTime, endTime] = [null, null, null, null];
        if(time) {
            [day, times] = time.split(" ");
            if(times) {
                [startTime, endTime] = times.split("-");
            }
        }

        const instructor = inputData[6 + i];
        const crn = inputData[7 + i];
        const genEd = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        departmentGenEd += courseName + "\", \"";
        // Add the course to the timetableData object

        timetableData[courseCode] = {
            subject: subject,
            department: department,
            number: number,
            section: section,
            courseName: courseName,
            credits: credits,
            day: day,
            startTime: startTime,
            endTime: endTime,
            instructor: instructor,
            crn: crn,
            genEd: genEd,
            prior: prior,
            specialInfo: specialInfo

        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataSpring.js', `export const timetableDataSpring = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataSpring.js', `export const courseNameStringsSpring = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataSpring.js', `export const courseNameToCodeSpring = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
async function launchPuppeteerSummer() {
    let inputData = ['Class Info'];
    let departmentGenEd = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/summer2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData
        // console.log("inputData:" + inputData + "\n");

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];

        // split by whitespace
        let [department, number, section] = [null, null, null];
        if(courseCode) {
            [department, number, section] = courseCode.split(" ");
        }

        // remove () from section start and end

        if(section) {
            section = section.replace(/\(/g, "");
            section = section.replace(/\)/g, "");
        }

        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];

        let [day, times, startTime, endTime] = [null, null, null, null];
        if(time) {
            [day, times] = time.split(" ");
            if(times) {
                [startTime, endTime] = times.split("-");
            }
        }

        const instructor = inputData[6 + i];
        const crn = inputData[7 + i];
        const genEd = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        departmentGenEd += courseName + "\", \"";
        // Add the course to the timetableData object

        timetableData[courseCode] = {
            subject: subject,
            department: department,
            number: number,
            section: section,
            courseName: courseName,
            credits: credits,
            day: day,
            startTime: startTime,
            endTime: endTime,
            instructor: instructor,
            crn: crn,
            genEd: genEd,
            prior: prior,
            specialInfo: specialInfo

        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataSummer.js', `export const timetableDataSummer = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataSummer.js', `export const courseNameStringsSummer = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataSummer.js', `export const courseNameToCodeSummer = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
async function launchPuppeteerFall() {
    let inputData = ['Class Info'];
    let departmentGenEd = "";
    let courseNames = [];
    const timetableData = {};
    const courseNameToCode = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ug-schedules.tuj.ac.jp/ug/academics/semester-info/schedule/fall2023');

    const tableDatas = await page.$$('td');
    for (const tableData of tableDatas) {
        const classData = await tableData.evaluate(node => node.textContent);
        inputData.push(classData.toString());

    }

    for (let i = 0; i < inputData.length; i += 11) {
        // Split the block into inputData
        // console.log("inputData:" + inputData + "\n");

        // Extract the relevant information from the inputData

        const courseCode = inputData[2 + i];

        // split by whitespace
        let [department, number, section] = [null, null, null];
        if(courseCode) {
            [department, number, section] = courseCode.split(" ");
        }

        // remove () from section start and end

        if(section) {
            section = section.replace(/\(/g, "");
            section = section.replace(/\)/g, "");
        }

        const subject = inputData[1 + i];
        const courseName = inputData[3 + i];
        const credits = inputData[4 + i];
        const time = inputData[5 + i];

        let [day, times, startTime, endTime] = [null, null, null, null];
        if(time) {
            [day, times] = time.split(" ");
            if(times) {
                [startTime, endTime] = times.split("-");
            }
        }

        const instructor = inputData[6 + i];
        const crn = inputData[7 + i];
        const genEd = inputData[8 + i];
        const prior = inputData[9 + i];
        const specialInfo = inputData[10 + i];
        //Determine if this course is a Gened course
        departmentGenEd += courseName + "\", \"";
        // Add the course to the timetableData object

        timetableData[courseCode] = {
            subject: subject,
            department: department,
            number: number,
            section: section,
            courseName: courseName,
            credits: credits,
            day: day,
            startTime: startTime,
            endTime: endTime,
            instructor: instructor,
            crn: crn,
            genEd: genEd,
            prior: prior,
            specialInfo: specialInfo

        };
        // Add the courseName to the courseName object
        if (courseNames.indexOf(courseName) === -1 && courseName !== null) {
            courseNames.push(courseName)
        }
        // Add the courseName to the courseNameToCode object
        if (Array.isArray(courseNameToCode[courseName])) {
            courseNameToCode[courseName].push(courseCode);
        } else if (courseNameToCode[courseName] !== undefined) {
            let array = [];
            array.push(courseNameToCode[courseName]);
            array.push(courseCode);
            courseNameToCode[courseName] = array;
        } else {
            courseNameToCode[courseName] = courseCode;
        }


    }
    console.log(timetableData);
    console.log(courseNameToCode);
    fs.writeFileSync('TimetableDataFall.js', `export const timetableDataFall = ${stringifyObject(timetableData)};\n`);
    fs.appendFileSync('TimetableDataFall.js', `export const courseNameStringsFall = ${JSON.stringify(courseNames, null, 2)};`);
    fs.appendFileSync('TimetableDataFall.js', `export const courseNameToCodeFall = ${JSON.stringify(courseNameToCode, null,2)};`);
    await browser.close();
    //console.log(timetableData);
}
launchPuppeteerSpring();
launchPuppeteerSummer();
launchPuppeteerFall();
function stringifyObject(obj) {
    let result = '{\n';

    for (const key in obj) {
        const value = obj[key];
        result += `  "${key}": {\n`;

        for (const innerKey in value) {
            const innerValue = JSON.stringify(value[innerKey]);
            result += `    ${innerKey}: ${innerValue},\n`;
        }

        result += '  },\n';
    }

    result += '}';
    return result;
}


