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
    const {date, pax, cuisine, area, franchise} = req.body; //ignore data and pax for now
    // const query = db.select(
    //     "Restaurant.Name",
    //     "Restaurant.Address",
    //     "Restaurant.Capacity",
    //     "Restaurant.Area",
    //     "Restaurant.Opening_hours",
    //     "Restaurant.Closing_hours",
    //     "Restaurant.FranchisorName",
    //     "Restaurant.url",
    //     'array_agg( Food.Cuisine )'
    //     ).from("Restaurant")
    //     .innerJoin("Food", 'Restaurant.Name','Food.RestaurantName' )
    //     .where('Area', 'like', `%${area}%`)
    //     .andWhere('FranchisorName', 'like', `%${franchise}%`)
    //     .andWhere('Cuisine', 'like', `%${cuisine}%`)
    //     .distinct()
    //     .groupBy(        
    //     "Restaurant.Name",
    //     "Restaurant.Address",
    //     "Restaurant.Capacity",
    //     "Restaurant.Area",
    //     "Restaurant.Opening_hours",
    //     "Restaurant.Closing_hours",
    //     "Restaurant.FranchisorName",
    //     "Restaurant.url")
    //     console.log(query.toString())

    //Keep for the moment if we want/can do postgre aggregate array function from knex
    const query = db.raw(`
            SELECT distinct "Restaurant"."Name", "Restaurant"."Address", "Restaurant"."Capacity", "Restaurant"."Area", "Restaurant"."Opening_hours", "Restaurant"."Closing_hours", "Restaurant"."FranchisorName", "Restaurant"."url", 
                (
                SELECT array_agg("Food"."Cuisine") AS c
                FROM "Food"
                WHERE "Food"."RestaurantName" = "Restaurant"."Name"
                ) AS cuisine
            FROM "Restaurant" INNER JOIN "Food"
            ON "Restaurant"."Name" = "Food"."RestaurantName" 
            WHERE "Area" LIKE '%${area}%'
            AND "FranchisorName" LIKE '%${franchise}%'
            AND "Cuisine" LIKE '%${cuisine}%'
            GROUP BY "Restaurant"."Name", "Restaurant"."Address", "Restaurant"."Capacity", "Restaurant"."Area", "Restaurant"."Opening_hours", "Restaurant"."Closing_hours", "Restaurant"."FranchisorName", "Restaurant"."url"
            `)
            .timeout(1000).then(
            result => {
                res.status(200).json(result.rows)
        }).catch(err =>res.status(400).json(err));//'Unable to Retrieve'));
}

const getAllCuisines = (req, res, db) => {
    db('Food').select("Cuisine").distinct().timeout(1000)
        .then(cuisine => {
            res.status(200).json(cuisine.map(x=>x.Cuisine));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllAreas = (req, res, db) => {
    db('Area').select("Area_name").timeout(1000)
        .then(area => {
            res.status(200).json(area.map(x => x.Area_name));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllFranchise = (req, res, db) => {
    db('Franchisor').select().timeout(1000)
        .then(franchisor => {
            res.status(200).json(franchisor.map(x=>x.FNAME));
        }).catch(err =>  res.status(400).json('Unable to Retrieve'));
}

const getAllRestaurants = (req, res, db) => {
    const restaurant = db.select().from("Restaurant").timeout(1000)
    .then(
        function(result) { 
                res.status(200).json(result);
        }
    ).catch(
        err =>  res.status(400).json('Unable to Retrieve')
    );
}

module.exports = {
    getRestaurant: getRestaurant,
    findRestaurant: findRestaurants,
    getAllCuisines: getAllCuisines,
    getAllAreas: getAllAreas,
    getAllFranchise: getAllFranchise,
    getAllRestaurants:getAllRestaurants
}