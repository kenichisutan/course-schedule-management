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
        return

    # Add new account
    query = "INSERT INTO Login (username, password, email, accountType)" \
            "VALUES (%s, %s, %s, %s)"

    cursor.execute(query, (username, password, email, accountType))

    connection.commit()
    cursor.close()

    print("New user added")


def retrieveUsers(connection):
    cursor = connection.cursor()

    query = "SELECT userID, username, email, accountType FROM Login"

    cursor.execute(query)

    # Convert result to json
    jsonResult = []

    for(userID, username, email, accountType) in cursor:
        jsonResult.append({'userID': userID,
                           'username': username,
                           'email': email,
                           'accountType': accountType})

    cursor.close()

    return jsonResult


def main():
    connection = mysql.connector.connect(user="root",
                                         password="12345678",
                                         host="127.0.0.1",
                                         database="course-schedule")
    username = "admin"
    password = sha256_crypt.hash("thisIsAPassword")
    email = "admin@admin.com"
    accountType = "admin"

    addNewAccount(connection, username, password, email, accountType)
    addNewAccount(connection, "moderator", sha256_crypt.hash("moderator"), "moderator@moderator.com", "basic")

    connection.close()

main()
