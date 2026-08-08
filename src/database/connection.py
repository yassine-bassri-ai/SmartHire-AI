import mysql.connector

from mysql.connector import Error


class DatabaseConnection:

    def __init__(self):

        self.connection = None

    def connect(self):

        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="yassine2004",
            database="smarthire_ai",
            autocommit=True
        )

        return connection

    def close(self):

        if self.connection and self.connection.is_connected():

            self.connection.close()

            print("Connection closed.")