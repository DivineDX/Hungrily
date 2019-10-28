// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('Restaurant').del()
//     .then(()=>knex('Franchisor').del())
//     .then(()=>knex('Area').del())
//     .then(function () {
//       // Inserts seed entries
//       return knex('Area').insert(Areas);
//     })
//     .then(function () {
//       // Inserts seed entries
//       return knex('Franchisor').insert(Franchisor);
//     })
//     .then(function () {
//       // Inserts seed entries
//       return knex('Restaurant').insert(RestaurantRows);
//     })
//     .then(function () {
//       // Inserts seed entries
//       return knex('Food').insert(Foods);
//     })
// };

const testrestaurants = [
  {
    store_name:"4Fingers Crispy Chicken (Changi Airport T3)",
    location: "65 Airport Boulevard #B2-02 Changi Airport Terminal 3 Singapore (819663)",
    userid: "4fingersFranchisorAccount",
    capacity: 100,
    area: "Changi",
    opening_hours:"09:00:00",
    closing_hours: "21:00:00",
    url: "4fingers-crispy-chicken-changi-airport-t3",
    cuisine: ["Korean", "Burgers", "Halal"],
    tables: [5,10,15,20,25,30,35],
    specialops:[]
  },
  {
    store_name:"Fish & Co. (Changi Airport T2)",
    location: "60 Airport Boulevard #036-085 Changi Airport Terminal 2, Level 3 Public Area Singapore (819643)",
    userid: "FishnCoFranchisorAccount",
    capacity: 50,
    area: "Changi",
    opening_hours:"09:00:00",
    closing_hours: "20:00:00",
    url: "fish-co-changi-airport-t2",
    cuisine: ["Seafood", "Halal"],
    tables: [17,2,54,6,1],
    specialops:[]
  },
  {
    store_name:"Fish & Co. (AMK Hub)",
    location: "53 Ang Mo Kio Avenue 3 #02-03 AMK Hub Singapore (569933)",
    userid: "FishnCoFranchisorAccount",
    capacity: 50,
    area: "Ang Mo Kio",
    opening_hours:"09:00:00",
    closing_hours: "23:00:00",
    url: "fish-co-amk-hub",
    cuisine: ["Seafood", "Halal"],
    tables: [12,13,1,5],
    specialops:[]
  },
  {
    store_name:"Major 99",
    location: "4190 Ang Mo Kio Ave 6 #02-02 Broadway Plaza Singapore (569841)",
    userid: "Major99FranchisorAccount",
    capacity: 30,
    area: "Ang Mo Kio",
    opening_hours:"09:00:00",
    closing_hours: "13:00:00",
    url: "major-99",
    cuisine: ["Bar"],
    tables: [1,4,6,12],
    specialops:[]
  },
  {
    store_name:"Urbana Rooftop Bar",
    location: "99 Irrawaddy Road Level 33 Courtyard by Marriott Singapore Novena Singapore (329568)",
    userid: "UrbanaRooftopBarFranchisorAccount",
    capacity: 35,
    area: "Novena",
    opening_hours:"09:00:00",
    closing_hours: "13:00:00",
    url: "major-99",
    cuisine: ["Bar", "International", "Burgers"],
    tables: [54,12,64,12],
    specialops:[]
  },
]

function getAccounts(){
  return Array.from(new Set(testrestaurants.map(x=> x['userid']))).map(
    x=>(
      {
        userid:x,
        password:"12345"
      }
    )
  )
}

function getfranchises(){
  return Array.from(new Set(testrestaurants.map(x=> x['userid']))).map(
    x=>(
      {
        userid:x,
        fname:x + `s name`
      }
    )
  )
}

function getFoods(){
  var Foods = []
  for( i=0;i<testrestaurants.length;i++){
    var currentRestaurant = testrestaurants[i];
    for( j=0;j<currentRestaurant['cuisine'].length;j++){
      Foods.push(
        {
          location:currentRestaurant['location'],
          userid:currentRestaurant['userid'],
          name: "Food" + String(j),
          cuisine:currentRestaurant['cuisine'][j],
          type: (j%2 == 0? "rice" : "noodles"),
          price: (j + (j%2 == 0? 0.5 : 0))
        }
      )
    }
  }
  return Foods
}
function getRestaurants(){
  return testrestaurants.map(
    x=>({
      store_name:x["store_name"],
      location: x["location"],
      userid: x["userid"],
      capacity: x["tables"].reduce((a,b)=>(a+b)),
      area: x["area"],
      opening_hours:x["opening_hours"],
      closing_hours: x["closing_hours"],
      url: x["url"],
    })
  )
}
function getTables(){
  var tables = []
  for( i=0;i<testrestaurants.length;i++){
    var currentRestaurant = testrestaurants[i];
    for( j=0;j<currentRestaurant['tables'].length;j++){
      tables.push(
        {
          location:currentRestaurant['location'],
          userid:currentRestaurant['userid'],
          tablenum: j,
          capacity:currentRestaurant['tables'][j]
        }
      )
    }
  }
  return tables
}
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tables').del()
    .then(() =>knex('food').del())
    .then(() =>knex('restaurant').del())
    .then(() =>knex('franchiseowner').del())
    .then(() =>knex('account').del())
    .then(() =>knex('account').insert(getAccounts()))
    .then(() => knex('franchiseowner').insert(getfranchises()))
    .then(() => knex('restaurant').insert(getRestaurants()))
    .then(() => knex('food').insert(getFoods()))
    .then(() => knex('tables').insert(getTables()));
  };