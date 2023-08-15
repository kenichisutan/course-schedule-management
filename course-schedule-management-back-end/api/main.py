from flask import Flask, render_template, request
from passlib.hash import sha256_crypt
import mysql.connector

import accounts

app = Flask(__name__)

if __name__ == '__main__':
    print("Server is running...")
    app.run(host='0.0.0.0', port='5000')
