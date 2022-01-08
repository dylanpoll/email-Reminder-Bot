import { htmlEmailBody } from "./nodeMailer/htmlEmailBody";
import { sendmail } from "./nodeMailer/Nodemailer";
import { QueryForEmailList } from "./PostgresQuery/QueryForEmailList";
import { countDownUtil } from "./countDownUtil";
//import { newUserQuery } from "./PostgresQuery/NewUserQuery";
import dotenv from 'dotenv'; 
dotenv.config(); 

const main = async () => {
    //await newUserQuery();
    
    var Difference_in_Days_string = await countDownUtil(); //gets the countdown value
    var id = 1;

    while(true){
        let ID : string = ''+id;
        let RecieverEmail : string | undefined =  await QueryForEmailList( "email", ID); //postgresql query function pulls values from the db dynamically
        
        if( RecieverEmail === undefined ){  //this just kills the attempts whenever there is no listed DB value. is set !== can be used to add a new email without sending emails.
            console.log("Email List Returned Undefined when looking for a user at ID: " + id + " .. closing attempt instance as there are no more users to email.");  // just for server logs.
            return false;
        }

        else{
            //if(id === 2){  //if statement used to test out particular emails during trouble shooting... don't want to spam everyone on the list.
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
