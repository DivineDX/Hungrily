const RestaurantData = require('../TempData/RestaurantData');

const getRestaurant = (req, res, db) => {
    const restaurant = RestaurantData.find((restr) => {        
        return restr.url == req.params.name;
    });
    if(restaurant) {
        res.status(200).json(restaurant);
    } else {
        res.status(400).json('Unable to Retrieve');
    }
}

const findRestaurants = (req, res, db) => {
    const {date, pax, cuisine, area, franchise} = req.body;
    filteredData = RestaurantData.filter(data => {
        return data.area.includes(area)
        && data.franchisor.includes(franchise)
        && (!cuisine || data.cuisine.includes(cuisine));
    });
    res.json(filteredData);
}

module.exports = {
    getRestaurant: getRestaurant,
    findRestaurant: findRestaurants
}