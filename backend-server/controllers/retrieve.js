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

module.exports = {
    getRestaurant: getRestaurant
}