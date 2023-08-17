from flask import jsonify


def insertCourse(connection, semester, subject, department, number, section, courseName, credits, day,
                 startTime, endTime, instructor, crn, genEd, prior, specialInfo):
    cursor = connection.cursor()

    # Verify that course is not already in database
    query = "SELECT * FROM Courses WHERE semester = %s AND subject = %s " \
            "AND department = %s AND number = %s AND section = %s"

    cursor.execute(query, (semester, subject, department, number, section))

    if cursor.fetchone() is not None:
        print("ERROR: Course already in database")
        return True

    # Add new course
    query = "INSERT INTO Courses (semester, subject, department, number, section," \
            "courseName, credits, day, startTime, endTime, instructor, crn, genEd," \
            "prior, specialInfo)" \
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s," \
            "%s, %s, %s, %s, %s)"

    cursor.execute(query, (semester, subject, department, number, section,
                           courseName, credits, day, startTime, endTime,
                           instructor, crn, genEd, prior, specialInfo))

    connection.commit()
    cursor.close()

    print("New course added")


def retrieveCourseData(connection, semester):
    cursor = connection.cursor()

    query = "SELECT * FROM Courses WHERE semester = %s"

    cursor.execute(query, (semester,))

    if cursor is None:
        print("ERROR: No courses found")
        return jsonify({"error": True,
                        "message": "No courses found"}), 404

    # Convert result to json
    jsonResult = []

    for(semester, subject, department, number, section, courseName, credits, day, startTime,
        endTime, instructor, crn, genEd, prior, specialInfo) in cursor:
        jsonResult.append({'semester': semester,
                           'subject': subject,
                           'department': department,
                           'number': number,
                           'section': section,
                           'courseName': courseName,
                           'credits': credits,
                           'day': day,
                           'startTime': str(startTime),
                           'endTime': str(endTime),
                           'instructor': instructor,
                           'crn': crn,
                           'genEd': genEd,
                           'prior': prior,
                           'specialInfo': specialInfo})

    #print(jsonResult)
    cursor.close()

    return jsonResult, 200
