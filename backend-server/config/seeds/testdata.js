const RestaurantRows=[
  {
      Name: "4Fingers Crispy Chicken (Changi Airport T3)",
      Address: "65 Airport Boulevard #B2-02 Changi Airport Terminal 3 Singapore (819663)",
      Capacity: 100,
      Area: "Changi",
      //cuisine: ["Korean", "Burgers", "Halal"],
      //price: '$',
      Opening_hours: "09:00:00",
      Closing_hours: "21:00:00",
      FranchisorName: "4Fingers",
      url: "4fingers-crispy-chicken-changi-airport-t3" 
  },
  {
      Name: "Fish & Co. (Changi Airport T2)",
      Address: "60 Airport Boulevard #036-085 Changi Airport Terminal 2, Level 3 Public Area Singapore (819643)",
      Capacity: 50,
      Area: "Changi",
      //cuisine: ["Seafood", "Halal"],
      //price: '$$',
      //opening_hrs: "1000",
      //closing_hrs: "2300",
      FranchisorName: "Fish & Co.",
      url: "fish-co-changi-airport-t2"
  },
  {
      Name: "Fish & Co. (AMK Hub)",
      Address: "53 Ang Mo Kio Avenue 3 #02-03 AMK Hub Singapore (569933)",
      Capacity: 50,
      Area: "Ang Mo Kio",
      //cuisine: ["Seafood", "Halal"],
      //price: '$$',
      //opening_hrs: "1000",
      //closing_hrs: "2300",
      FranchisorName: "Fish & Co.",
      url: "fish-co-amk-hub"
  },
  {
      Name: "Major 99",
      Address: "4190 Ang Mo Kio Ave 6 #02-02 Broadway Plaza Singapore (569841)",
      Capacity: 30,
      Area: "Ang Mo Kio",
      //cuisine: ["Bar"],
      //price: '$$',
      //opening_hrs: "1400",
      //closing_hrs: "0100",
      FranchisorName: "Major 99",
      url: "major-99"
  },
  {
      Name: "Urbana Rooftop Bar",
      Address: "99 Irrawaddy Road Level 33 Courtyard by Marriott Singapore Novena Singapore (329568)",
      Capacity: 40,
      Area: "Novena",
      //cuisine: ["Bar", "International", "Burgers"],
      //price: '$$',
      //opening_hrs: "1700",
      //closing_hrs: "0100",
      FranchisorName: "Urbana Rooftop bar",
      url: "urbana-rooftop-bar"
  }
]

const Areas =  Array.from(Array.from(new Set(RestaurantRows.map(x=>x['Area']))).map(function(x){return{Area_name:x} }))
const Franchisor =  Array.from(Array.from(new Set(RestaurantRows.map(x=>x['FranchisorName']))).map(function(x){return{FNAME:x} }))

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Restaurant').del()
    .then(()=>knex('Franchisor').del())
    .then(()=>knex('Area').del())
    .then(function () {
      // Inserts seed entries
      return knex('Area').insert(Areas);
    })
    .then(function () {
      // Inserts seed entries
      return knex('Franchisor').insert(Franchisor);
    })
    .then(function () {
      // Inserts seed entries
      return knex('Restaurant').insert(RestaurantRows);
    })
};
