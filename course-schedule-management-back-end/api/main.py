from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

import accounts
import auth
import database
from api import courses

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/authenticate', methods=[ 'POST' ])
def api_authenticate():
    data = request.json

    if data:
        username = data.get('username')
        password = data.get('password')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    return auth.authenticate(con, username, password)


@app.route('/admin_authenticate', methods=[ 'POST' ])
def api_admin_authenticate():
    data = request.json

    if data:
        accessToken = data.get('access_token')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    return auth.adminAuthenticate(accessToken)


@app.route('/admin', methods=[ 'GET' ])
def api_admin_endpoint():
    return auth.verifyAdminCookie()


@app.route('/users', methods=[ 'GET' ])
def api_retrieve_users():
    return accounts.retrieveUsers(con)


@app.route('/user', methods=[ 'POST' ])
def api_retrieve_user():
    data = request.json
    print(data)

    if data:
        id = data.get('id')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    return accounts.retrieveUser(con, id)


@app.route('/insert-course', methods=[ 'POST' ])
def api_insert_course():
    data = request.json
    #print(data)
    for course_key, course_details in data.items():
        if course_key == '0':
            continue  # Skip entries with '0' key

        semester = course_details[ "semester" ]
        subject = course_details[ "subject" ]
        department = course_details[ "department" ]
        number = course_details[ "number" ]
        section = course_details[ "section" ]
        courseName = course_details[ "courseName" ]
        credits = course_details[ "credits" ]
        day = course_details[ "day" ]
        startTime = course_details[ "startTime" ]
        endTime = course_details[ "endTime" ]
        instructor = course_details[ "instructor" ]
        crn = course_details[ "crn" ]
        genEd = course_details[ "genEd" ]
        prior = course_details[ "prior" ]
        specialInfo = course_details[ "specialInfo" ]

        if not courses.insertCourse(con, semester, subject, department, number, section,
                                    courseName, credits, day, startTime, endTime,
                                    instructor, crn, genEd, prior, specialInfo):
            # Handle insertion failure
            pass
        else:
            return jsonify({"error": True,
                            "message": "An error occured"}), 400

    return jsonify({"error": False,
                    "message": "Course(s) added successfully"}), 200


@app.route('/retrieve-course-data', methods=[ 'POST' ])
def api_retrieve_course_data():
    data = request.json
    print(data)

    if data:
        semester = data.get('semester')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    return courses.retrieveCourseData(con, semester)


@app.route('/new-user', methods=[ 'POST' ])
def api_new_user():
    data = request.json
    print(data)

    if data:
        username = data.get('username')
        password = data.get('password')
        passwordConfirm = data.get('passwordConfirm')
        email = data.get('email')
        accountType = data.get('accountType')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    if password != passwordConfirm:
        return jsonify({"error": True,
                        "message": "Passwords do not match"}), 400

    return accounts.addNewAccount(con, username, password, email, accountType)


if __name__ == '__main__':
    print("Server is starting...")
    print("Connecting to database...")
    con = database.connect()
    if not con:
        print("ERROR: Could not connect to database")
        exit(1)
    print("Connected to database")
    app.run(host='0.0.0.0', port='5000')
