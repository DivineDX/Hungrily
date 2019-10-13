export const DateToString = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(typeof dateString !== 'undefined'){
        const dateOnly = dateString.slice(0,10);
        const arrayDate = dateOnly.split('-'); //YY-MM-DD format
        const monthString = months[Number(arrayDate[1])-1];
        return arrayDate[2] + " " + monthString + " " + arrayDate[0];
    }else{
        return "";
    }
}