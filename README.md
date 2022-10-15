# Storefront Online Store API

Table of contents
=================
   * [How to setup and connect to the database](#how-to-setup-and-connect-to-the-database)
      * [Installation](#installation)
        * [Windows Installation](#windows-installation)
        * [Mac Installation](#mac-installation)
      * [Connect To a PostgreSQL Database Server](#connect-to-a-postgresql-database-server)
        * [Windows Connection](#windows-connection)
        * [Mac Connection](#mac-connection)
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

Windows Connection
------------------

Visit this [Link](https://www.postgresqltutorial.com/postgresql-getting-started/connect-to-postgresql-database/) , and follow the steps to how to connect to PostgreSQL server on Windows.


Mac Connection
--------------

Visit this [Link](https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399) , and follow the steps to how to connect to PostgreSQL server on Mac.


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