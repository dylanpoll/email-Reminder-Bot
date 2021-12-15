import { Client } from "ts-postgres";

//https://node-postgres.com/features/types/
export async function newUserQuery(userEmail : string , userName : string , userClass : string) {
    var DBPort: any = process.env.POSTGRESQL_PORT;
    const Port: number = +DBPort;
    const client = new Client({
        "host": process.env.POSTGRESQL_HOST,
        "port": Port,
        "database": process.env.POSTGRESQL_DATABASE,
        "user": process.env.POSTGRESQL_USER,
        "password": process.env.POSTGRESQL_PASSWORD
    });

    const newData = { 
        email : `"`+ userEmail +`"`, 
        name :  `"`+ userName +`"`, 
        class : `"`+ userClass +`"` 
    };

    console.log('Adding to table : ');
    console.log(newData);
    await client.query('INSERT INTO emaillist(data) VALUES ( $1 )', [newData]);
    client.end();
};