# Movie-Review-Backend
Backend for movie review app

## Setup

1. Fork & Clone this repo
2. `cd` into `Movie-Review-Backend`
3. Run `npm install`
4. Run `dropdb moviereviewdb`
5. Run `createdb moviereviewdb`
6. Run `knex migrate:latest`
7. Run `knex seed:run`
8. Run `node app.js`

## Additional Information:
The backend is built in Node.js using Express. The database is a PostgreSQL database and you will need to install PostgreSQL locally (`brew install postgres`) to run some of the commands above and interact with the database.
