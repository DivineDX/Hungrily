/**
 *  GET: Returns the data on a single restaurant
 *  Returns an object with the keys store_name, location, area, opening_hours, closing_hours, Cuisine, Price 
 */
const getRestaurant = (req, res, db) => {
    db.raw(`
            SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
            FranchiseOwner.FNAME AS FranchisorName,
            FranchiseOwner.userid AS franchisorid,
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
            GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url,FranchiseOwner.userid
            LIMIT 1
            `)
            .timeout(1000).then(
            result => {
                const restaurantRows = result.rows.map(x=>(
                    {
                        //{ location, area, opening_hours, closing_hours, cuisine, price }
                        store_name: x.store_name,
                        userid:x.franchisorid,
                        resUrl:x.url,
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
 * Returns an array that contains all the special operating hours of a specific restaurant
 */
const restaurantSpecialOperatingHours = (req, res, db) => {
    const sql = 
    `SELECT 
    CASE 
    WHEN Special_operating_hrs.day_of_week = 0 THEN 'Sunday' 
    WHEN Special_operating_hrs.day_of_week = 1 THEN 'Monday'
    WHEN Special_operating_hrs.day_of_week = 2 THEN 'Tuesday'
    WHEN Special_operating_hrs.day_of_week = 3 THEN 'Wednesday'
    WHEN Special_operating_hrs.day_of_week = 4 THEN 'Thursday'
    WHEN Special_operating_hrs.day_of_week = 5 THEN 'Friday'
    WHEN Special_operating_hrs.day_of_week = 6 THEN 'Saturday'
    ELSE NULL END
    AS DAY
    , Special_operating_hrs.opening_hours AS open, Special_operating_hrs.closing_hours AS CLOSE
    FROM Special_operating_hrs 
    JOIN Restaurant
    ON Special_operating_hrs.userid = Restaurant.userid
    AND Special_operating_hrs.location = Restaurant.location
    WHERE restaurant.url = '${req.params.name}'
    ORDER BY Special_operating_hrs.day_of_week;
    `;

    db.raw(sql).timeout(3000)
        .then(result => {
            res.status(200).json(result.rows);
        }).catch(err => {
            res.status(400).json(err);  
        })
    
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
            ) AS price,
            (
            SELECT ROUND(CAST(AVG(Reservation.Rating) as numeric), 2) AS r
            FROM Reservation
            WHERE Reservation.Location = Restaurant.Location
            AND Reservation.Restaurant_UserID = Restaurant.UserID
            AND Reservation.Rating IS NOT NULL
            ) AS rating
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
                        ratings:x.rating == null ? 'Unrated' : x.rating 
                    }
                )))
        }).catch(err =>{console.log(err);res.status(400).json(err)});//'Unable to Retrieve'));
}

const getAllCuisines = (req, res, db) => {
    const sql =
    `
    SELECT DISTINCT cuisine
    FROM food
    ORDER BY
    cuisine
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
    ORDER BY
    Area
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
    ORDER BY
    FNAME
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
        ) AS price,
        (
        SELECT ROUND(CAST(AVG(Reservation.Rating) as numeric), 2) AS r
        FROM Reservation
        WHERE Reservation.Location = Restaurant.Location
        AND Reservation.Restaurant_UserID = Restaurant.UserID
        AND Reservation.Rating IS NOT NULL
        ) AS rating
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
                ratings:x.rating == null ? 'Unrated' : x.rating 
            }
        )))
    }).catch(err =>  {
        console.log(err)
        res.status(400).json('Unable to Retrieve')});
}

const getCompatibleRestaurants = (req, res, db) => {
    const {userid} = req.body
    const sql =
    `
    With  X (cuisine,num) AS (
        SELECT Food.cuisine, count(DISTINCT Reservation.Location) as num
        FROM Reservation
        INNER JOIN
        Food
        ON Food.Location =  Reservation.Location
        AND Food.UserID  = Reservation.Restaurant_UserID
        WHERE Reservation.customer_userid = '${userid}'
        GROUP BY
        Food.cuisine
        ORDER BY
        num DESC
    ),
    Y (Store_Name,Location,UserID,Capacity,Area,Opening_hours,Closing_hours,url,cuisine,num ) AS (
        SELECT DISTINCT r.Store_Name,r.Location,r.UserID,r.Capacity,r.Area,r.Opening_hours,r.Closing_hours,r.url,f.cuisine,num  --string_agg(DISTINCT Food.cuisine, ',') , sum(DISTINCT num)
        FROM
        Food as f 
        INNER JOIN 
        X as X
        ON X.cuisine = f.cuisine
        INNER JOIN 
        restaurant as r
        ON f.location = r.location
        and 
        f.UserID = r.userID
        ORDER BY
        r.location
    )
    SELECT Store_Name,Location,UserID,Capacity,Area,Opening_hours,Closing_hours,url,string_agg( y.cuisine, ',') as cuisine , sum( num) as matchrate,
    (
    SELECT ROUND(CAST(AVG(Food.Price) as numeric), 2) AS p
    FROM Food
    WHERE Food.Location = Y.Location
    AND Food.UserID = Y.UserID
    ) AS price,
    (
    SELECT ROUND(CAST(AVG(Reservation.Rating) as numeric), 2) AS r
    FROM Reservation
    WHERE Reservation.Location = y.Location
    AND Reservation.Restaurant_UserID = y.UserID
    AND Reservation.Rating IS NOT NULL
    ) AS rating
    FROM
    Y
    GROUP BY
    Store_Name,Location,UserID,Capacity,Area,Opening_hours,Closing_hours,url,price,rating
    ORDER BY
    matchrate DESC,
    location ASC
    `
    db.raw(sql).timeout(1000)
    .then(restaurants => {
        res.status(200).json(restaurants.rows.map(x=>(
            {
                name:x.store_name,
                area:x.area,
                cuisine:x.cuisine + " in common with your favourites",
                openingHours:x.opening_hours,
                closingHours:x.closing_hours,
                price:'~$'+x.price,
                url:x.url,
                ratings:x.rating == null ? 'Unrated' : x.rating 
            }
        )))
    }).catch(err =>  {
        console.log(err)
        res.status(400).json('Unable to Retrieve')});
}


module.exports = {
    getRestaurant: getRestaurant,
    getRestaurantMenu: getRestaurantMenu,
    getRestaurantSpecialOpHrs: restaurantSpecialOperatingHours,
    findRestaurant: findRestaurants,
    getAllCuisines: getAllCuisines, 
    getAllAreas: getAllAreas,
    getAllFranchise: getAllFranchise,
    getAllRestaurants:getAllRestaurants,
    getCompatibleRestaurants:getCompatibleRestaurants
}

//
const suggestedRestaurants = 
`
--reccomended restaurants
With  X (cuisine,num) AS (
    SELECT DISTINCT Food.cuisine , COUNT (Food.cuisine) AS num
    FROM Reservation
    INNER JOIN
    Food
    ON Food.Location =  Reservation.Location
    AND Food.UserID  = Reservation.Restaurant_UserID
    WHERE Reservation.customer_userid = 'PeterLoth96'
    GROUP BY
    Food.cuisine
    ORDER BY
    num DESC
),
Y (id, location,  cuisine, num ) AS (
    SELECT Food.userid,location,  Food.cuisine, num
    FROM
    Food INNER JOIN X
    ON X.cuisine = Food.cuisine
    GROUP BY
    Food.userid,location,Food.cuisine, num
    ORDER BY
    location
)
SELECT id,location,sum(num) AS matchrate,string_agg( Y.Cuisine,', ')
FROM
Y
Group by
id,location
ORDER BY
matchrate DESC
`