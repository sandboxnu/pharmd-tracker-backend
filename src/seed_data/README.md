TLDR: `npm run seed` but be careful because it will delete all your tables' content

# Contents
* [So you want to populate your database](#so-you-want-to-populate-your-database)
* [Seeding Data](#seeding-data)
* [Factories](#factories)
* [Seeders](#seeders)

# So you want to populate your database

This directory houses our data factories and seeders. Since we can't use actual student data for our project outside of production (you know, FERPA), we need to have mock data ready to be sent to our frontend from our local databases.

We are using `typeorm-seeding`, a poorly documented and poorly maintained package that gets the job done.

# Seeding Data
In order to seed your data, make sure you have the latest version of the `ormconfig` file. Then, run `npm run seed`. Please take note that this command **wipes out your database tables**, so if you have any data you would like to preserve, you should save it elsewhere beforehand. Additionally, this command should never be run on production.

# Factories
In order to seed our database, we need to define Factory objects that can mass produce our stuff. One of these has been defined for all of our entities except for `Users`. As we continue to flesh out and update our models, we should try our best to update these factories to reflect those changes. All factories can be found in `factories/`. 

# Seeders
After defining our factories, we need a way to actually send our data to our local database. This is where seeders come in.

As of now (3/2021), we only have two seeders defined, in `seeds/`. This is because our data models are very complex and intertwined. So, we have a seeder for `Courses` and a seeder for `Students`. The `Course` seeder must be run before the `Student` one, because the `Student` one pulls course data that needs to already be populated.

The `Course` seeder creates a set of `Exams` for each course. The exams are attached to the courses after they are created, during the creation of the `Course`.

The `Student` seeder creates sets of `Notes`, `StudentCourses`, and `StudentExams`. The `Notes` are attached to the student after creation.  The `StudentCourses` are attached to their courses _while_ being created, and then attached to the student after creation. The `StudentExams` is attached to their exam _while_ being created, and then attached to the student after creation.
