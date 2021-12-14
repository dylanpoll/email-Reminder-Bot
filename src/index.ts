import {htmlEmailBody} from "./nodeMailer/htmlEmailBody";
import { sendmail } from "./nodeMailer/Nodemailer";
import dotenv from 'dotenv'; // this is the exact setup needed to call .env in the root of the project file.
import { QueryForEmailList } from "./PostgresQuery/QueryForEmailList";
import { countDownUtil } from "./countDownUtil";
dotenv.config(); // this must be placed before any process.env calls.

const main = async () => {
    var Difference_in_Days_string = await countDownUtil(); //gets the countdown value
    console.log(Difference_in_Days_string);
    var i = 1;
    while(true){
        var ID : string = ''+i;         
        let RecieverEmail : string | undefined =  await QueryForEmailList( "email", ID); //postgresql query function pulls values from the db dynamically
        if(RecieverEmail === undefined ){ return false; } //this just kills the attempts whenever there is no listed DB value.
        else{
            let RecieverName : string | undefined =  await QueryForEmailList( "name", ID); 
            let RecieverClass : string | undefined =  await QueryForEmailList( "class", ID);
            let subTitleLine : string|undefined = RecieverName + "....";
            let mailBody : string = htmlEmailBody(Difference_in_Days_string, RecieverName, RecieverClass);  // passes in params to inject into a html template and returns that as a string to be processed by nodeMailer
            console.log("ID : "+ ID + " | Attempting to send email to : " + RecieverEmail + " | name : " + RecieverName + " | Class : " + RecieverClass);
            sendmail( RecieverEmail , subTitleLine , mailBody );
            i++;
        }
    }
}
main().catch((err) => {
    console.error(err);
});