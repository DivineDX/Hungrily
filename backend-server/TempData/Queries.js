const RestaurantData = require('./RestaurantData');

const getAllCuisines = () => {
    const allCuisine = new Set();
    RestaurantData.forEach(data => {
        const resCuisines = data.cuisine;
        resCuisines.forEach(cuisine => {
            allCuisine.add(cuisine);
        })
    })
    return Array.from(allCuisine);
}

const getAllAreas = () => {
    const allLocations = new Set();
    RestaurantData.forEach(data => {
        allLocations.add(data.area);
    })
    return Array.from(allLocations);
}

const getAllRestaurants = () => {
    const resNames = new Set();
    RestaurantData.forEach(data => {
        resNames.add(data.name);
    })
    return Array.from(resNames);
}

module.exports = {
    cuisines: getAllCuisines(),
    areas: getAllAreas(),
    restaurants: getAllRestaurants()
}