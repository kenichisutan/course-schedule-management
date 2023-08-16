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
    accessToken = generateAccessToken(result[ 0 ], result[ 4 ])
    response = jsonify({'success': True,
                        'message': 'Authentication successful',
                        'access_token': accessToken})

    # Set the access token as an HttpOnly cookie
    response.set_cookie('access_token', accessToken)
    return response, 200  # 200 = OK


def adminAuthenticate(accessToken):
    if not accessToken:
        print("ERROR: Missing access token")
        return jsonify({"error": True,
                        "message": "Missing access token"}), 400

    # Decode the access token and see if account_type field is admin
    key = 'thisIsASecretKeyAndNoOneWillEverGuessIt'
    try:
        decodedToken = jwt.decode(accessToken, key, algorithms='HS256')
    except jwt.ExpiredSignatureError:
        print("ERROR: Access token expired")
        return jsonify({"error": True,
                        "message": "Access token expired"}), 401
    except jwt.InvalidTokenError:
        print("ERROR: Invalid access token")
        return jsonify({"error": True,
                        "message": "Invalid access token"}), 401

    if "account_type" in decodedToken:
        account_type = decodedToken[ "account_type" ]
    else:
        print("ERROR: Invalid access token")
        return jsonify({"error": True,
                        "message": "Invalid access token"}), 401

    if account_type != "admin":
        print("ERROR: Not an admin")
        return jsonify({"error": True,
                        "message": "Not an admin"}), 401

    return jsonify({"success": True,
                    "message": "Admin authentication successful"}), 200


def generateAccessToken(userID, accountType):
    # Define the payload
    payload = {
        'sub': userID,  # Subject (user ID)
        'account_type': accountType,  # Account type
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
