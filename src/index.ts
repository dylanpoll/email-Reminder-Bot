import {htmlEmailBody} from "./nodeMailer/htmlEmailBody";
import { sendmail } from "./nodeMailer/Nodemailer";
import { QueryForEmailList } from "./PostgresQuery/QueryForEmailList";
import { countDownUtil } from "./countDownUtil";
//import { newUserQuery } from "./PostgresQuery/NewUserQuery";
import dotenv from 'dotenv'; 
dotenv.config(); 


/*
NEXT STEP : make general DB client function, make all query functions generate a string to send to that function.
this should help reduce bloat in code as there really should only need to be on client object communicating with the db.
*/

const main = async () => {
    //newUserQuery("test@emailtest.com" , "testName" , "testClass"); // userEmail , userName , userClass
    var Difference_in_Days_string = await countDownUtil(); //gets the countdown value
    var id = 1;

    while(true){
        let ID : string = ''+id;
        let RecieverEmail : string | undefined =  await QueryForEmailList( "email", ID); //postgresql query function pulls values from the db dynamically
        
        if( RecieverEmail === undefined ){  //this just kills the attempts whenever there is no listed DB value.
            return false;
        }

        else{
            //if(id === 1){  //if statement used to test out particular emails during trouble shooting... don't want to spam everyone on the list.
            let RecieverClass : string | undefined =  await QueryForEmailList( "class", ID);
            let RecieverName : string | undefined =  await QueryForEmailList( "name", ID);
            let subTitleLine : string|undefined = RecieverName + "....";
            let mailBody : string = htmlEmailBody(Difference_in_Days_string, RecieverName, RecieverClass);  // passes in params to inject into a html template and returns that as a string to be processed by nodeMailer
            console.log("ID : "+ ID + " | Attempting to send email to : " + RecieverEmail + " | name : " + RecieverName + " | Class : " + RecieverClass);  // just for server logs.
            sendmail( RecieverEmail , subTitleLine , mailBody );
            //}
        };

        id++;
    };
}

main().catch((err) => {
    console.error(err);
});
