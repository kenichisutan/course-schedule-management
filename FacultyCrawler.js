const puppeteer = require('puppeteer');
const fs = require('fs');
const {text} = require("express");

async function launchPuppeteerSpring() {
    let nameData = [];
    let departmentData = [];
    let titleData = [];
    let facultyNamesToDescription = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.tuj.ac.jp/ug/academics/semester-info/faculty/full-list');
    const tableDataNames = await page.$$('h1');
    const tableDataDepartment = await page.$$('h3');
    const tableDataTitle = await page.$$('h4');
    for (const tableNames of tableDataNames) {
        const classData = await tableNames.evaluate(node => node.textContent);
        nameData.push(classData.toString());

    }
    nameData = nameData.slice(2);
    for (const tableDepartment of tableDataDepartment) {
        const classData = await tableDepartment.evaluate(node => node.textContent);
        departmentData.push(classData.toString());
    }
    for (const tableTitle of tableDataTitle) {
        const classData = await tableTitle.evaluate(node => node.textContent);
        titleData.push(classData.toString());
    }

    for (let i = 0; i < nameData.length; i++) {
        facultyNamesToDescription[nameData[i]] = {
            department: departmentData[i],
            title: titleData[i],
        }
    }
    fs.writeFileSync('FacultyNames.js', `const facultyNames = ${JSON.stringify(nameData, null, 2)};`);
    fs.appendFileSync('FacultyNames.js', ` const facultyNamesToDescription = ${JSON.stringify(facultyNamesToDescription, null, 2)};`);
    await browser.close();
    //console.log(timetableData);
}

launchPuppeteerSpring()
// for (let i = 0; i < facultyNames.length; i++) {
//     const modifiedName = facultyNames[i].toLowerCase().replaceAll(" ", "");
//     // console.log("<li><a href=../PROFS/" + modifiedName +".html>" + facultyNames[i] + "</a></li>");
//     console.log("{ name: \""+ facultyNames[i]+ "\", file: \"" + modifiedName + "\" },")
// }