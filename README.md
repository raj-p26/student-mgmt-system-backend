# Student Management System Backend

This is the repository containing the backend of Student Management System.

## Getting started

- Make sure you have NodeJS installed in your Machine, if not [click here](https://nodejs.com/https://nodejs.org/en/download/package-manager):

```sh
node -v
```

- Install sqlite in your machine from [here](https://sqlite.org/download.html)

- After that, either fork or clone this repo.

- Dump the schema.sql file into your sqlite db:

```sh
sqlite3 mydb.db < schema.sql
```

This will create necessary table(s) in the database.

## Up and Running

- To run the server:

```sh
npm run start
```

or alternatively

```sh
node ./index.js
```