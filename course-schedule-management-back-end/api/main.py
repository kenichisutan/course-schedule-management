from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

import accounts
import auth
import database

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


if __name__ == '__main__':
    print("Server is starting...")
    print("Connecting to database...")
    con = database.connect()
    if not con:
        print("ERROR: Could not connect to database")
        exit(1)
    print("Connected to database")
    app.run(host='0.0.0.0', port='5000')
