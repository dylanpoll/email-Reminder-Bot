import {basebuild} from "./nodeMailer/baseTemplate";
import { sendmail } from "./nodeMailer/Nodemailer";

import dotenv from 'dotenv'; // this is the exact setup needed to call .env in the root of the project file.
const env : any = dotenv.config(); // this must be placed before any process.env calls.

var Mail_Count: any = process.env.TOTAL_RECIEVERS; // have to assign type any and use a var..
const Email_List_Size : number = +Mail_Count; // if I do not do this the compilers strict typing will see turning it into a number as potentialy a violation

const main = async () => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        var date1 = new Date(year + "/" + month + "/" + date);
        var date2 = new Date("02/25/2022");
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        var Difference_in_Days_string : string = '' + Difference_In_Days;

        var i = 1;
        while(i<=Email_List_Size){         
        var Reciever : string = ("RECIEVER_" + i);
        //Reciever = env[Reciever];
        console.log("Attempting to send email to : " + Reciever + env["parsed"]);

        let testgreeting:string = Difference_in_Days_string;       //this is just used to test string html construction at the moment. I will make a param var later
        let whoWillRecieve:string | undefined = process.env.RECIEVER_1;
        let whoWillRecieve2:string | undefined = process.env.RECIEVER_2;
        let subTitleLine:string|undefined = 'Ashen One...';
        let mailBody:string = basebuild(testgreeting);  // this will go to the template I made and eventually factor in user data and pass it as a param
        sendmail(whoWillRecieve,subTitleLine,mailBody);  //test delivery of mail
        sendmail(whoWillRecieve2,subTitleLine,mailBody);  //test delivery of mail
        i++;
        }
}
//launches and will log if any errors occur.
main().catch((err) => {
    console.error(err);
});