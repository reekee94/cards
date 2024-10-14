## Installation

Instal and configure PostgreSQL

create postgres user in .env it will qual `PGUSER`
set password for your db in .env it will qual `PGPASSWORD`
created db in .env it will qual `PGDATABASE`
db port in .env it will qual `PGPORT` (by default its 5432)


## Contains swagger documentation
http://localhost:5003/swagger

```bash
$ npm install
or
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
or
$ npm run start

# watch mode
$ yarn run start:dev
or
$ npm run start:dev


```
## Shortest way Docker installed needed
run in terminal: 
docker-compose build
docker-compose up
and go:
http://localhost:3010/swagger


