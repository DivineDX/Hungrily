const getRestaurant = (req, res, db) => {
    db('Restaurant').select().where({url:req.params.name}).timeout(1000)
        .then(rest => {
            if(!rest || !rest.length) {
                throw err;
            }
            res.status(200).json(rest[0]);
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const findRestaurants = (req, res, db) => {
    //return type = const { Name, Area, cuisine, Opening_hours, Closing_hours, Price, url, Ratings }
    const {date, pax, cuisine, area, franchise} = req.body; //ignore data and pax for now
    db.raw(`
            SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
            FranchiseOwner.FNAME AS FranchisorName,
            Restaurant.url, 
                (
                SELECT string_agg(Food.Cuisine,', ') AS c
                FROM Food
                WHERE Food.Location = Restaurant.Location
                AND Food.UserID = Restaurant.UserID
                ) AS cuisine
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
                console.log(result.rows)
                res.status(200).json(result.rows.map(x=>(
                    {
                        Name:x.store_name,
                        Area:x.area,
                        cuisine:x.cuisine,
                        Opening_hours:x.opening_hours,
                        Closing_hours:x.closing_hours,
                        Price:0,
                        url:x.url,
                        Ratings:0
                    }
                )))
        }).catch(err =>res.status(400).json(err));//'Unable to Retrieve'));
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
    SELECT *
    FROM Restaurant
    `
    db.raw(sql).timeout(1000)
    .then(restaurants => {
        res.status(200).json(restaurants.rows);
    }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

module.exports = {
    getRestaurant: getRestaurant,
    findRestaurant: findRestaurants,
    getAllCuisines: getAllCuisines,
    getAllAreas: getAllAreas,
    getAllFranchise: getAllFranchise,
    getAllRestaurants:getAllRestaurants
}