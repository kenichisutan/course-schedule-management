from flask import Flask, render_template, request
from passlib.hash import sha256_crypt
import mysql.connector

import accounts
import auth

con = mysql.connector.connect(user="root",
                              password="12345678",
                              host="127.0.0.1",
                              database="course-schedule")

app = Flask(__name__)


@app.route('/authenticate', methods=[ 'POST' ])
def api_authenticate():
    data = request.json

    username = request.form[ 'username' ]
    password = request.form[ 'password' ]

    return auth.authenticate(con, username, password)


if __name__ == '__main__':
    print("Server is running...")
    app.run(host='0.0.0.0', port='5000')
