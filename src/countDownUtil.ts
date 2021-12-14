export const countDownUtil = async () => {
    //math for counting down by the date.
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    var date1 = new Date(year + "/" + month + "/" + date); //this is todays date retrieved from the computer that is running this code server side
    var date2 = new Date("02/25/2022"); // this is the date being used to count the days till it arrives
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var Difference_in_Days_string: string = '' + Difference_In_Days;
    return Difference_in_Days_string;
};
