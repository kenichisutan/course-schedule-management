from flask import jsonify
from passlib.hash import sha256_crypt
import jwt
import datetime
import mysql.connector


def authenticate(connection, username, password):
    if not username or not password:
        print("ERROR: Missing username or password")
        return jsonify({"error": True,
                        "message": "Missing username or password"}), 400

    cursor = connection.cursor()

    # Verify that username and password are correct
    query = "SELECT * FROM Login WHERE username = %s"

    cursor.execute(query, (username,))

    result = cursor.fetchone()

    if result is None:
        print("ERROR: Username not found")
        return jsonify({'error': True,
                        'message': 'Authentication failed'}), 400  # 400 = Bad request

    if not sha256_crypt.verify(password, result[ 2 ]):
        print("ERROR: Incorrect password")
        return jsonify({'error': True,
                        'message': 'Authentication failed'}), 401  # 401 = Unauthorized

    # If all are correct
    print("Login successful")
    accessToken = generateAccessToken(result[ 0 ])
    return jsonify({'success': True,
                    'message': 'Authentication successful',
                    'access_token': accessToken}), 200  # 200 = OK


def generateAccessToken(userID):
    # Define the payload
    payload = {
        'sub': userID,  # Subject (user ID)
        'iat': datetime.datetime.utcnow(),  # Issued at timestamp
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expiry timestamp (1 hour from now)
    }

    # Define the key to be kept secure
    key = 'thisIsASecretKeyAndNoOneWillEverGuessIt'

    # Generate the access token
    accessToken = jwt.encode(payload, key, algorithm='HS256')

    return accessToken

# def main():
#     username = "admin"
#     password = "thisIsAPassword"
#
#     authenticate(con, username, password)
#
#     con.close()
#
#
# main()
