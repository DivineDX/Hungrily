

const getRestaurant = (req, res, db) => {
    const restaurant = db.select().from("Restaurant").where({Name:req.params.name}).timeout(1000)
    .then(
        function(result) { 
                res.status(200).json(result);
        }
    ).catch(
        err =>  res.status(400).json('Unable to Retrieve')
    );
}

const findRestaurants = (req, res, db) => {
    const {date, pax, cuisine, area, franchise} = req.body; //ignoring cuisine for now
    const restaurant = db.select().from("Restaurant").where({
        FranchisorName:franchise,
        Area:area
    }).timeout(1000).then(
        result => res.status(200).json(result)
    )
    .catch(err => 
        res.status(400).json('Unable to Retrieve'));
}

const getAllCuisines = (req, res, db) => {
    const restaurant = db.select("Cuisine").distinct().from("Food").timeout(1000)
    .then(
        function(result) { 
                res.status(200).json(result);
        }
    ).catch(
        err =>  res.status(400).json('Unable to Retrieve')
    );
}

const getAllAreas = (req, res, db) => {
    const restaurant = db.select().from("Area").timeout(1000)
    .then(
        function(result) { 
                res.status(200).json(result);
        }
    ).catch(
        err =>  res.status(400).json('Unable to Retrieve')
    );
}

const getAllFranchise = (req, res, db) => {
    const restaurant = db.select().from("Franchisor").timeout(1000)
    .then(
        function(result) { 
                res.status(200).json(result);
        }
    ).catch(
        err =>  res.status(400).json('Unable to Retrieve')
    );
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