from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from passlib.hash import sha256_crypt
import mysql.connector

import accounts
import auth

con = mysql.connector.connect(user="root",
                              password="12345678",
                              host="127.0.0.1",
                              database="course-schedule")

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/authenticate', methods=['POST'])
def api_authenticate():
    data = request.json

    if data:
        username = data.get('username')
        password = data.get('password')
    else:
        return jsonify({"error": True,
                        "message": "Invalid JSON payload"}), 400

    return auth.authenticate(con, username, password)


if __name__ == '__main__':
    print("Server is running...")
    app.run(host='0.0.0.0', port='5000')
