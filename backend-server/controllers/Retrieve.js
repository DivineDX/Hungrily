/**
 *  GET: Returns the data on a single restaurant
 *  Returns an object with the keys store_name, location, area, opening_hours, closing_hours, Cuisine, Price 
 */
const getRestaurant = (req, res, db) => {
    db.raw(`
            SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
            FranchiseOwner.FNAME AS FranchisorName,
            Restaurant.url, 
                (
                SELECT string_agg( DISTINCT Food.Cuisine,', ') AS c
                FROM Food
                WHERE Food.Location = Restaurant.Location
                AND Food.UserID = Restaurant.UserID
                ) AS cuisine,
                (
                SELECT ROUND(CAST(AVG(Food.Price) as numeric), 2) AS p
                FROM Food
                WHERE Food.Location = Restaurant.Location
                AND Food.UserID = Restaurant.UserID
                ) AS price
            FROM Restaurant INNER JOIN Food
            ON Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            INNER JOIN FranchiseOwner
            ON FranchiseOwner.UserID = Restaurant.UserID
            WHERE restaurant.url = '${req.params.name}'
            GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url
            LIMIT 1
            `)
            .timeout(1000).then(
            result => {
                const restaurantRows = result.rows.map(x=>(
                    {
                        //{ location, area, opening_hours, closing_hours, cuisine, price }
                        location:x.location,
                        area:x.area,
                        opening_hours:x.opening_hours,
                        closing_hours:x.closing_hours,
                        cuisine:x.cuisine,
                        price:'~$'+x.price
                    }));
                if(!restaurantRows || !restaurantRows.length || restaurantRows.length > 1) {

                    res.status(400).json('Unable to Retrieve')
                }
                res.status(200).json(restaurantRows[0])
        }).catch(
            err =>{
            res.status(400).json(err)});//'Unable to Retrieve'));

}

/**
 * GET: Similar to the getRestaurant query above, but now returns the menu (all food items) of that specific restaurant
 * Returns an array of objects with keys name, cuisine, type and price
 */
const getRestaurantMenu = (req, res, db) => {
    db.raw(`
            SELECT Food.name, Food.cuisine, Food.type, Food.price
            FROM Restaurant INNER JOIN Food
            ON Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            INNER JOIN FranchiseOwner
            ON FranchiseOwner.UserID = Restaurant.UserID
            WHERE restaurant.url = '${req.params.name}'
            `)
            .timeout(1000).then(
            result => {
                const restaurantRows = result.rows.map(x=>(
                    {
                        //name, cuisine, type and price
                        name:x.name,
                        cuisine:x.cuisine,
                        type:x.type,
                        price:x.price
                    }));
                res.status(200).json(restaurantRows)
        }).catch(
            err =>{
            res.status(400).json(err)});//'Unable to Retrieve'));

}
const findRestaurants = (req, res, db) => {
    //return type = const { Name, Area, cuisine, Opening_hours, Closing_hours, Price, url, Ratings }
    const {date, pax, cuisine, area, franchise} = req.body; //ignore data and pax for now
    db.raw(`
            SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
            FranchiseOwner.FNAME AS FranchisorName,
            Restaurant.url,
            (
            SELECT string_agg( DISTINCT Food.Cuisine,', ') AS c
            FROM Food
            WHERE Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            ) AS cuisine,
            (
            SELECT ROUND(CAST(AVG(Food.Price) as numeric), 2) AS p
            FROM Food
            WHERE Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            ) AS price
            FROM Restaurant INNER JOIN Food
            ON Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            INNER JOIN FranchiseOwner
            ON FranchiseOwner.UserID = Restaurant.UserID
            WHERE Area LIKE '%${area}%'
            AND FranchiseOwner.FNAME LIKE '%${franchise}%'
            AND Cuisine LIKE '%${cuisine}%'
            GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url
            `)
            .timeout(1000).then(
            result => {
                res.status(200).json(result.rows.map(x=>(
                    {
                        name:x.store_name,
                        area:x.area,
                        cuisine:x.cuisine,
                        openingHours:x.opening_hours,
                        closingHours:x.closing_hours,
                        price:'~$'+x.price,
                        url:x.url,
                        ratings:0
                    }
                )))
        }).catch(err =>{console.log(err);res.status(400).json(err)});//'Unable to Retrieve'));
}

const getAllCuisines = (req, res, db) => {
    const sql =
    `
    SELECT DISTINCT cuisine
    FROM food
    `
    db.raw(sql).timeout(1000)
        .then(cuisine => {
            res.status(200).json(cuisine.rows.map(x=>x.cuisine));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllAreas = (req, res, db) => {
    const sql =
    `
    SELECT DISTINCT Area
    FROM Restaurant
    `
    db.raw(sql).timeout(1000)
        .then(area => {
            res.status(200).json(area.rows.map(x => x.area));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllFranchise = (req, res, db) => {
    const sql =
    `
    SELECT DISTINCT FNAME
    FROM FranchiseOwner
    `
    db.raw(sql).timeout(1000)
        .then(franchisor => {
            res.status(200).json(franchisor.rows.map(x=>x.fname));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllRestaurants = (req, res, db) => {
    const sql =
    `
    SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
    FranchiseOwner.FNAME AS FranchisorName,
    Restaurant.url, 
        (
        SELECT string_agg(DISTINCT Food.Cuisine,', ') AS c
        FROM Food
        WHERE Food.Location = Restaurant.Location
        AND Food.UserID = Restaurant.UserID
        ) AS cuisine,
        (
            SELECT ROUND(CAST(AVG(Food.Price) as numeric), 2) AS p
            FROM Food
            WHERE Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            ) AS price
    FROM Restaurant INNER JOIN Food
    ON Food.Location = Restaurant.Location
    AND Food.UserID = Restaurant.UserID
    INNER JOIN FranchiseOwner
    ON FranchiseOwner.UserID = Restaurant.UserID
    GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url
    `
    db.raw(sql).timeout(1000)
    .then(restaurants => {
        res.status(200).json(restaurants.rows.map(x=>(
            {
                name:x.store_name,
                area:x.area,
                cuisine:x.cuisine,
                openingHours:x.opening_hours,
                closingHours:x.closing_hours,
                price:'~$'+x.price,
                url:x.url,
                ratings:0
            }
        )))
    }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

module.exports = {
    getRestaurant: getRestaurant,
    getRestaurantMenu: getRestaurantMenu,
    findRestaurant: findRestaurants,
    getAllCuisines: getAllCuisines, 
    getAllAreas: getAllAreas,
    getAllFranchise: getAllFranchise,
    getAllRestaurants:getAllRestaurants
}