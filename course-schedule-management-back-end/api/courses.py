def insertCourse(connection, semester, subject, department, number, section, courseName, credits, day,
                 startTime, endTime, instructor, crn, genEd, prior, specialInfo):
    cursor = connection.cursor()

    # Verify that course is not already in database
    query = "SELECT * FROM Courses WHERE semester = %s AND subject = %s " \
            "AND department = %s AND number = %s AND section = %s"

    cursor.execute(query, (semester, subject, department, number, section))

    if cursor.fetchone() is not None:
        print("ERROR: Course already in database")
        return

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
