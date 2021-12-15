import { Client } from "ts-postgres";

export async function QueryForEmailList(columnToSearchFor: string, ID: string) { // https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/ and https://www.npmjs.com/package/ts-postgres and  https://node-postgres.com/features/types/
    var reply: any;
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

    try { //try is where we form the query and attempt to submit it.
        const result: any = await client.query("SELECT data -> '" + columnToSearchFor + "' as email FROM emaillist WHERE id = " + ID); //made this to funnel any search for the json in the DB
         await client.end();
        for await (const row of result) {
            reply = row.get('email'); //assigns the reply to what we indicated the search is for and attaches it according to the email tag
        }
        return reply;
    } finally {
        //I honestly don't need this but I am required to have it with this setup, will re work later to get rid of it...
    }
}

