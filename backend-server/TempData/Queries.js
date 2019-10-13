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

const getAllFranchise = () => {
    const franchiseName = new Set();
    RestaurantData.forEach(data => {
        franchiseName.add(data.franchisor);
    })
    return Array.from(franchiseName);
}

module.exports = {
    cuisines: getAllCuisines(),
    areas: getAllAreas(),
    franchisors: getAllFranchise()
}