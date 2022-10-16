# Storefront Online Store API

Table of contents
=================
   * [How to setup and connect to the database](#how-to-setup-and-connect-to-the-database)
      * [Installation](#installation)
        * [Windows Installation](#windows-installation)
        * [Mac Installation](#mac-installation)
      * [Connect To a PostgreSQL Database Server](#connect-to-a-postgresql-database-server)
        * [Connect to Database Server Using psql](#connect-to-database-server-using-psql)
   * [What ports the backend and database are running on](#what-ports-the-backend-and-database-are-running-on)
   * [Package installation instructions](#package-installation-instructions)
   
How to setup and connect to the database
========================================

Installation
------------

Windows Installation
--------------------

Visit this [Link](https://phoenixnap.com/kb/install-postgresql-windows) , and follow the steps to how to download and install PostgreSQL on Windows.

Mac Installation
----------------

Visit this [Link](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql-macos) , and follow the steps to how to download and install PostgreSQL on MAc.

Connect To a PostgreSQL Database Server
--------------------------------------

Connect to Database Server Using psql
-------------------------------------

 After finishing installing PostgreSQL, you are ready to connect to database .

 1. Open PSQL terminal (SQL Shell(psql)) .

 2. Enter all the information such as Server, Database, Port, Username, and Password. If you press Enter, the program will use the default value specified in the square bracket [] and move the cursor to the new line. For example, localhost is the default database server. In the step for entering the password for user postgres, you need to enter the password the user postgres that you chose during the PostgreSQL installation .

 3. For creating a databse, enter the following command ```CREATE DATABASE storefront_online_store;```

 4. For creating a testing databse, enter the following command ```CREATE DATABASE storefront_online_store_test;```
 
 5. If you want to create a new user, enter the following command ```CREATE USER username WITH PASSWORD 'yourpassword';```

 6. Grant all privileges to the new created user, enter the following command ```GRANT ALL PRIVILEGES ON DATABASE storefront_online_store TO username; ```
    ```GRANT ALL PRIVILEGES ON DATABASE storefront_online_store_test TO username; ```

What ports the backend and database are running on
==================================================

The PostgreSQL database service is available on the default PostgreSQL port is 5432 .

The server is available on port 5000 .

Package installation instructions
=================================

1. Start to clone the project using git clone command.

```
    1. git clone git@github.com:gitbit-hash/storefront-online.git
```
2. run ```npm i``` or ```yarn``` to install install dependencies.

3.  Create a .env file at your root of your project, and add the following to it:
```
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=root
        POSTGRES_HOST=localhost
        POSTGRES_DB=storefront_online_store
        POSTGRES_DB_TEST=storefront_online_store_test
        ENV=dev
        PORT=5000
        ORIGIN=http://localhost
        BCRYPT_PASSWORD=Aopose039&*lsmco1as-Skld
        SALT_ROUNDS=10
        JWT_SECRET=BaseFo123450p!2$£xs@
```

4. run ```npm run dev``` to run the development server.