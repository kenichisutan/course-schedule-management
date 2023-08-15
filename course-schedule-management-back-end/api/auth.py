from flask import jsonify
from passlib.hash import sha256_crypt
import mysql.connector


def authenticate(connection, username, password):
    cursor = connection.cursor()

    # Verify that username and password are correct
    query = "SELECT * FROM Login WHERE username = %s"

    cursor.execute(query, (username,))

    result = cursor.fetchone()

    if result is None:
        print("ERROR: Username not found")
        return jsonify({'message': 'Username and password are required'}), 400

    if not sha256_crypt.verify(password, result[ 2 ]):
        print("ERROR: Incorrect password")
        return jsonify({'message': 'Login failed'}), 401

    # If all are correct
    print("Login successful")
    return jsonify({'message': 'Login successful'}), 200


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
