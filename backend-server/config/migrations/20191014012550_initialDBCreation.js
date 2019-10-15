
exports.up = function(knex) {
  return knex.schema
    .createTable('Franchisor', function(table){
      table.string("FNAME",100).primary();
    })
    .createTable('Area',function(table){
      table.string("Area_name",100).primary();
    })
    .createTable('Restaurant',function(table){
        table.string("Name",100).primary();
        table.string("Address",500);
        table.integer('Capacity').notNullable();
        table.string("Area",100).notNullable();
        table.time("Opening_hours").notNullable().defaultTo('09:00:00');
        table.time("Closing_hours").notNullable().defaultTo('21:00:00');
        table.string("FranchisorName",100);
        table.string('url',300);

        table.foreign('FranchisorName').references('Franchisor.FNAME');
        table.foreign('Area').references('Area.Area_name');
    })
    .createTable('Food',function(table){
        table.string("RestaurantName",100).notNullable();
        table.string("Name",100);
        table.string("Cuisine",100); //change to enum
        table.string("Type",100);
        table.decimal("Price",6,2).notNullable(); //max price 9999.99 sounds reasonable
        //Add Raw for Check()

        table.primary(['Name','RestaurantName']);
        table.foreign('RestaurantName').references('Restaurant.Name').onDelete("CASCADE");;
    })
    .createTable('Seating',function(table){
        table.string("RestaurantName",100).notNullable();
        table.integer("SeatingNum");
        table.integer('Capacity').notNullable();
        //Add Raw for Check()

        table.primary(['SeatingNum','RestaurantName']);
        table.foreign('RestaurantName').references('Restaurant.Name').onDelete('CASCADE');
    })
    .createTable('Customer',function(table){
        table.uuid("UserID").primary();
        table.string("Name",100).notNullable();
        table.string('Password',60).notNullable();
        table.integer('Points');
    })
    .createTable('Booking',function(table){
        table.uuid("BookingID").primary();
        table.uuid("Customer_id").notNullable();
        table.string("RestaurantName",100);
        table.integer("Pax").notNullable();
        table.integer('Rating');
        //Add Raw for Check()
        table.time('Timestart').notNullable();
    })
    .raw('ALTER TABLE "Food" ADD CONSTRAINT priceconstraint CHECK("Price">=0)')
    .raw('ALTER TABLE "Seating" ADD CONSTRAINT seatingcapacityconstraint CHECK("Capacity">=0)')
    .raw('ALTER TABLE "Booking" ADD CONSTRAINT ratingconstraint CHECK(("Rating" IS NULL) OR ("Rating" > 0 AND "Rating" <=5))');


};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Booking')
    .dropTableIfExists('Customer')
    .dropTableIfExists('Seating')
    .dropTableIfExists('Seating')
    .dropTableIfExists('Food')
    .dropTableIfExists('Restaurant')
    .dropTableIfExists('Area')
    .dropTableIfExists('Franchisor');
};
