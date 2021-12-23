//import { stringify } from "querystring";
import { Client } from "ts-postgres";

//https://node-postgres.com/features/types/
export async function newUserQuery(
    //userEmail : string , userName : string , userClass : string
    ) {
    var DBPort: any = process.env.POSTGRESQL_PORT;
    const Port: number = +DBPort;
    const client = new Client({
        "host": process.env.POSTGRESQL_HOST,
        "port": Port,
        "database": process.env.POSTGRESQL_DATABASE,
        "user": process.env.POSTGRESQL_USER,
        "password": process.env.POSTGRESQL_PASSWORD
    });

    client.connect();

//https://node-postgres.com/features/types/
    const newData = {
        email : "some@email.com" , 
        name:  "aName",
        class: "manual"
    };

    console.log('sending the query...');
    await client.query('INSERT INTO emaillist(data) VALUES ( $1 )', [newData]);
    console.log('Sent.')
    client.end();
};

/* 
INSERT INTO emaillist(data) VALUES ( $1 ) {
     "email" : "example@email.com", "name" : "exampleName", "class" : "exampleClass" 
    };

//incase I need to do this with terminal directly for any reason.
 */