from flask import jsonify
from passlib.hash import sha256_crypt
import mysql.connector


def addNewAccount(connection, username, password, email, accountType):
    cursor = connection.cursor()

    # Verify that username and email are not already in use
    query = "SELECT * FROM Login WHERE username = %s OR email = %s"

    cursor.execute(query, (username, email))

    if cursor.fetchone() is not None:
        print("ERROR: Username or email already in use")
        return jsonify({"error": True,
                        "message": "Username or email already in use"}), 400

    # Add new account
    query = "INSERT INTO Login (username, password, email, accountType)" \
            "VALUES (%s, %s, %s, %s)"

    password = sha256_crypt.hash(password)

    cursor.execute(query, (username, password, email, accountType))

    connection.commit()
    cursor.close()

    return jsonify({"error": False,
                    "message": "User successfully added"}), 200

    print("New user added")


def retrieveUsers(connection):
    cursor = connection.cursor()

    query = "SELECT userID, username, email, accountType FROM Login"

    cursor.execute(query)

    if cursor is None:
        print("ERROR: No users found")
        return jsonify({"error": True,
                        "message": "No users found"}), 404

    # Convert result to json
    jsonResult = [ ]

    for (userID, username, email, accountType) in cursor:
        jsonResult.append({'userID': userID,
                           'username': username,
                           'email': email,
                           'accountType': accountType})

    cursor.close()

    return jsonResult, 200


def retrieveUser(connection, id):
    cursor = connection.cursor()

    query = "SELECT userID, username, email, accountType FROM Login WHERE userID = %s"

    cursor.execute(query, (id,))

    if cursor is None:
        print("ERROR: No user found")
        return jsonify({"error": True,
                        "message": "No user found"}), 404

    # Convert result to json
    jsonResult = [ ]

    for (userID, username, email, accountType) in cursor:
        jsonResult.append({'userID': userID,
                           'username': username,
                           'email': email,
                           'accountType': accountType})

    cursor.close()

    return jsonResult, 200


def editUser(connection, id, username, password, email, accountType):
    cursor = connection.cursor()

    # Verify that username and email are not already in use
    query = "SELECT * FROM Login WHERE (username = %s OR email = %s) AND userID != %s"

    cursor.execute(query, (username, email, id))

    if cursor.fetchone() is not None:
        print("ERROR: Username or email already in use")
        return jsonify({"error": True,
                        "message": "Username or email already in use"}), 400

    # Edit user
    # If password is empty, do not update password
    print(username, password, email, accountType)
    if password == "":
        query = "UPDATE Login SET username = %s, email = %s, accountType = %s WHERE userID = %s"
        cursor.execute(query, (username, email, accountType, id))
    else:
        password = sha256_crypt.hash(password)
        query = "UPDATE Login SET username = %s, password = %s, email = %s, accountType = %s WHERE userID = %s"
        cursor.execute(query, (username, password, email, accountType, id))

    connection.commit()
    cursor.close()

    return jsonify({"error": False,
                    "message": "User successfully edited"}), 200

    print("User edited")


# def main():
#     connection = mysql.connector.connect(user="root",
#                                          password="12345678",
#                                          host="127.0.0.1",
#                                          database="course-schedule")
#     username = "admin"
#     password = "admin"
#     email = "admin@admin.com"
#     accountType = "admin"
#
#     addNewAccount(connection, username, password, email, accountType)
#     addNewAccount(connection, "moderator", "moderator", "moderator@moderator.com", "basic")
#
#     connection.close()
#
# main()