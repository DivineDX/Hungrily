/**
 * each const represents the reservations of a specific restaurant. 
 * For this context, they are all different restaurants under the same franchise
 * Only shows reservations that are the date today
 */

const reservationsData1 = [{
    userID: "PersonX", //customer
    table: 3,
    pax: 2,
    dateTime: new Date('2019-12-17T15:25:00') //SG Time
},
{
    userID: "PersonY", //customer
    table: 2,
    pax: 5,
    dateTime: new Date('2019-12-01T12:30:00') //SG Time
},
{
    userID: "PersonY", //customer
    table: 7,
    pax: 3,
    dateTime: new Date('2019-12-10T06:30:00') //SG Time
}]

const reservationsData2 = [{
    userID: "PersonA", //customer
    table: 5,
    pax: 3,
    dateTime: new Date('2019-12-17T15:25:00') //SG Time
},
{
    userID: "PersonX", //customer
    table: 3,
    pax: 2,
    dateTime: new Date('2019-12-20T12:30:00') //SG Time
},
{
    userID: "PersonY", //customer
    table: 5,
    pax: 4,
    dateTime: new Date('2019-12-14T06:30:00') //SG Time
}]

const reservationsData3 = [{
    userID: "PersonX", //customer
    table: 3,
    pax: 3,
    dateTime: new Date('2019-12-17T15:25:00') //SG Time
},
{
    userID: "PersonZ", //customer
    table: 3,
    pax: 5,
    dateTime: new Date('2019-12-04T12:30:00') //SG Time
},
{
    userID: "PersonA", //customer
    table: 10,
    pax: 2,
    dateTime: new Date('2019-12-12T06:30:00') //SG Time
}]

module.exports = {
    data1: reservationsData1,
    data2: reservationsData2,
    data3: reservationsData3
}