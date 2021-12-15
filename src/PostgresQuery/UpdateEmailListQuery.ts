import { Client } from "ts-postgres";

//https://node-postgres.com/features/types/
export async function newUserQuery(DBTable : string, newValue : string , FieldToUpdate: string, ID : string) {
    var DBPort: any = process.env.POSTGRESQL_PORT;
    const Port: number = +DBPort;
    const client = new Client({
        "host": process.env.POSTGRESQL_HOST,
        "port": Port,
        "database": process.env.POSTGRESQL_DATABASE,
        "user": process.env.POSTGRESQL_USER,
        "password": process.env.POSTGRESQL_PASSWORD
    });

    //query using passed in params
    await client.query(`UPDATE `+ DBTable +` SET data = 
    jsonb_set(
        data::jsonb, 
        '{`+ FieldToUpdate +`}', jsonb '"`+ newValue +`"'
        ) 
    WHERE id =` + ID);
    client.end();
};

/*
//https://node-postgres.com/features/types/
const newData = {
    email : "clint.schmeltzer@bristolwest.com",
    name:  "Marvin",
    class: "Deprived of Big shaft, User of Big Axe instead"
};
await client.query('INSERT INTO emaillist(data) VALUES($1)', [newData]);

const createDBAndTable = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS emailList (
  ID  SERIAL PRIMARY KEY,
  data JSONB
);
`//https://www.postgresql.org/docs/9.1/pgcrypto.html

// help with jsonb and postgres https://guillaume-martin.github.io/how-to-handle-json-data-in-postgresql.html
UPDATE emaillist
SET data = jsonb_set(data::jsonb, '{email}', jsonb '"EXAMPLE@gmail.com"')
WHERE id = SOMENUMBER;
*/