# Setting Up

### General Outline:
1. Download PostgreSQL
2. Create a database for PharmD
3. Configure your ormconfig.json file
4. Run the backend

## Setting Up Postgres

The first thing you want to do is download and set up PostgreSQL on your laptop.

- If you are a Mac user, this article can help you download Postgres:  
https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
- If you are a Windows user, this article can help you download Postgres:  
https://medium.com/@aeadedoyin/getting-started-with-postgresql-on-windows-201906131300-ee75f066df78

After downloading Postgres onto your machine, you will need to create a database for the project.
1. In your terminal, ensure that postgres is running by entering `brew services start postgresql` on Mac or `pg_ctl start` on Windows. 
2. In your terminal, enter `psql postgres` to enter an interactive postgres shell.
3. To create a database, enter `create database <database name>;`.
4. To create a user for yourself to use instead of the default, enter `create user <username> with password '<password>';` with your desired username and password.
5. To give that user permissions to your database, enter `grant all privileges on database <dbname> to <username>;`
6. To verify that you've created your database, enter `\l` to list the databases on your server. You should see a table titled `List of databases` where one of the entries is  `<database name>`.
7. You can exit the shell by entering `\q`.

Here is a helpful list of psql commands: https://www.postgresqltutorial.com/psql-commands/

## Setting Up Your Config File

In the pharmd-tracker-backend directory, you should see a file called `ormconfig.example.json`, an example of what your config file should look like.
To create your config file:
1. Duplicate the `ormconfig.example.json` file.
2. Rename the copied file `ormconfig.json`. This will be your config file.
3. In `ormconfig.json`, fill in values for `"username"` and `"password"` with the credentials of the user your created above. 
For `"database"`, use the database name you used above.   
(The `"host"` and the `"port"` have been filled out as `"localhost"` and `"5432"` because these are postgres' default values. 
If you changed these values while setting up postgres, you will also need to change their values in this file.)

## Running the Backend

In your terminal:
1. Navigate to your pharmd-tracker-backend directory.
2. Run `npm install`.
3. Run `npm start` to start the project, or `npm run dev` to run the project with hot reloading.  
You should see a console message saying `Server started on port 3000! http://localhost:3000/`.

Now you have the backend running!

You'll probably want to start sending your own requests and a helpful tool for that is Postman, a desktop app that helps you test out APIs.  
Here's a good article to get you started on using Postman: https://www.guru99.com/postman-tutorial.html.
