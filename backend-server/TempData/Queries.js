const RestaurantData = require('./RestaurantData');

// depreciated

// const getAllCuisines = () => {
//     const restaurant = db.select("Cuisine").distinct.from("Food").where({Name:req.params.name}).timeout(1000)
//     .then(
//         function(result) { 
//                 res.status(200).json(result);
//         }
//     ).catch(
//         err =>  res.status(400).json('Unable to Retrieve')
//     );
//     return Array.from(allCuisine);
// }

const getAllAreas = () => {
    const allLocations = new Set();
    RestaurantData.forEach(data => {
        allLocations.add(data.area);
    })
    return Array.from(allLocations);
}

const getAllFranchise = () => {
    const franchiseName = new Set();
    RestaurantData.forEach(data => {
        franchiseName.add(data.franchisor);
    })
    return Array.from(franchiseName);
}

module.exports = {
    //cuisines: getAllCuisines(),
    areas: getAllAreas(),
    franchisors: getAllFranchise()
}