# GraphQL (with Apollo) + MongoDB (using Mongoose) + Docker

- Server example using GraphQL/MongoDB/Docker.
- Ready for production deployment, database management (backup/restore) and acceptance tests.
- Comes with very simple generic models to give example (Users/Posts/Comments)

## Requirements

- Npm
- Docker

## Getting started

1. clone respository
2. Create a `.env` using `.example.env` file (see instructions in it)
3. Run `npm run dev` for development or `npm run start` on production server

In both `development` and `production`, api will be available for GraphQL queries at `localhost:PORT` (defined in `.env`)
In `development` only, Apollo GraphQL playground will be available in browser at `localhost:PORT` (defined in `.env`)

## Npm scripts

| script  | description                                     |
| ------- | ----------------------------------------------- |
| `lint`  | Run eslint and fix automatically when possible  |
| `start` | Start a docker container with production server |

| `stop` | Stop production docker container (if running)                                                                                            |
| `dev`   | Start a docker container with development server                                                                                            |
| `test`  | Start a docker container to run acceptance tests. Note that sudo password will be asked (used to clean tests database before running tests) |

## DB Seeds in development

You can add seeds to populate your database with initial data in development.
You can edit `docker/mongo-with-seeds/seeds/*` file (see `users.js` example) to add seeds.
NOTE: They will only be used on for `development` container

## Backup/Restore/Empty MongoDB Database

Note that for database management scripts to run successfully, corresponding container (development or production) must be up and running.

### Backup

`./scripts/db.h <environment> backup <db_username (set in .env)> <db_password (set in .env)>`  
Example: `./scripts/db.sh development backup sammy sammy1234` will create a `db_development.dump` file which is your database backup, in location where you ran command.

### Restore

`./scripts/db.h <environment> restore <db_username (set in .env)> <db_password (set in .env)> <path_to_dump (created with backup command)>`  
Example: `./scripts/db.sh development backup sammy sammy1234 db_development.dump` will use `db_development.dump` file to restore your database.

### Empty

`./scripts/db.h <environment> empty <db_username (set in .env)> <db_password (set in .env)>  <db_name (set in .env)>`  
Example: `./scripts/db.sh development backup sammy sammy1234 api` will drop `api` database in your mongoDB container instance


