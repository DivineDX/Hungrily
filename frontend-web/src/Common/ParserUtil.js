const dateParser = (dateTimeObj) => {
    const dateOnly = dateTimeObj.toDateString();
    const timeOnly = dateTimeObj.toTimeString().substring(0,8)

    return dateOnly + " " + timeOnly;
}

export default dateParser;