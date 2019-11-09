
const upSQL = 
`
DROP TABLE IF EXISTS FranchiseOwner CASCADE; 
DROP TABLE IF EXISTS Restaurant CASCADE;
DROP TABLE IF EXISTS Food CASCADE;
DROP TABLE IF EXISTS Tables CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Reservation Cascade; 
DROP TABLE IF EXISTS Account Cascade; 
DROP TABLE IF EXISTS Special_Operating_Hrs Cascade;
DROP TABLE IF EXISTS Customer_voucher Cascade; 
DROP TABLE IF EXISTS Possible_voucher Cascade;
DROP TABLE IF EXISTS Ratings Cascade; 

CREATE TABLE Account(
    UserID varchar(100) PRIMARY KEY,
    Password varchar(60) NOT NULL
);

CREATE TABLE FranchiseOwner (
    UserID varchar(100) PRIMARY KEY REFERENCES Account ON DELETE CASCADE,
    FNAME varchar(100)
);

CREATE TABLE Restaurant (
    Store_Name varchar(100),
    Location varchar(100),
    UserID varchar(100), 
    Capacity integer NOT NULL,
    Area varchar(100) NOT NULL,
    Opening_hours time NOT NULL default '09:00:00', 
    Closing_hours time NOT NULL default '21:00:00', 
    url varchar(300) UNIQUE NOT NULL ,
    PRIMARY KEY (Location, UserID),
    FOREIGN KEY (UserID) REFERENCES FranchiseOwner ON DELETE CASCADE
);

CREATE TABLE Food (
    Location varchar(100) NOT NULL,
    UserID varchar(100) NOT NULL,
    Name varchar(100),
    Cuisine varchar(100),
    Type varchar(100),
    Price real NOT NULL CHECK (Price >= 0), 
    PRIMARY KEY (Name, Location, UserID), -- is this correct? 
    FOREIGN KEY (Location, UserID) REFERENCES Restaurant ON DELETE CASCADE
);

CREATE TABLE Tables (
    Location varchar(100) NOT NULL,
    UserID varchar(100) NOT NULL,
    TableNum integer,
    Capacity integer NOT NULL CHECK (Capacity > 0), 
    PRIMARY KEY (TableNum, Location, UserID), -- is this correct? 
    FOREIGN KEY (Location, UserID) REFERENCES Restaurant ON DELETE CASCADE
);

CREATE TABLE Special_Operating_Hrs (
    Location varchar(100) NOT NULL,
    UserID varchar(100) NOT NULL,
    Day_of_week integer, 
    Opening_hours time NOT NULL,
    Closing_hours time NOT NULL, 
    PRIMARY KEY (Day_of_week, Location, UserID),
    FOREIGN KEY (Location, UserID) REFERENCES Restaurant ON DELETE CASCADE,
    CHECK (Day_of_week >= 0 and Day_of_week <= 6), 
    CHECK (Opening_hours < Closing_hours )
);

CREATE TABLE Customer ( 
    UserID varchar(100) PRIMARY KEY REFERENCES Account ON DELETE CASCADE,
    Name varchar(100) NOT NULL, -- the name does not have to be primary key anymore right? 
    Points integer NOT NULL DEFAULT 0
    CHECK (Points >=0 )
);

CREATE TABLE Possible_voucher (
    Voucher_code varchar(30) PRIMARY KEY,
    Discount int,
    Description Character(1000),
    Cost int NOT NULL
    CHECK(Discount > 0 AND Discount <=100)
);

CREATE TABLE Customer_voucher (
    Voucher_code varchar(30) REFERENCES Possible_voucher ON DELETE CASCADE, 
    UserID varchar(100) REFERENCES Customer ON DELETE CASCADE,
    Is_used boolean DEFAULT FALSE,
    SerialNum uuid DEFAULT uuid_generate_v1(), --to handle multiple instances of the same voucher
    PRIMARY KEY (Voucher_code, UserID, SerialNum) -- Help check cos it has 2 owning entity
);

CREATE TABLE Reservation (
    Customer_UserID varchar(100) REFERENCES Customer ON DELETE CASCADE,
    TableNum integer,
    Location varchar(100),
    Restaurant_UserID varchar(100), 
    Pax integer NOT NULL,
    DateTime timestamp with time zone NOT NULL,
    Rating integer,
    PRIMARY KEY (Customer_UserID, Restaurant_UserID, TableNum, Location, DateTime),
    FOREIGN KEY (TableNum, Location, Restaurant_UserID) REFERENCES Tables,
    CHECK ((Rating >= 0 and Rating <= 5) or Rating IS NULL)
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION test(x timestamp) RETURNS void AS $test$
    DECLARE
        dayofweek integer := EXTRACT(DOW FROM x);
        dateofbooking timestamp := date_trunc('day', x);
        sometime time := make_time(1, 0, 0);
    BEGIN
        RAISE NOTICE 'DAy: (%)', dayofweek;
        RAISE NOTICE 'test called(%)', dateofbooking;
        RAISE NOTICE 'test called(%)', (dateofbooking+sometime);
    END;
$test$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ReservationConstraints() RETURNS TRIGGER AS $ReservationConstraints$
    DECLARE
    dayofweek integer := EXTRACT(DOW FROM NEW.datetime);
    dateofbooking timestamp with time zone := date_trunc('day', NEW.datetime);
    bookingtimestart timestamp with time zone := date_trunc('minute', NEW.datetime);
    bookingtimeend timestamp with time zone := date_trunc('minute', NEW.datetime) + interval '2 hour';
    autotable integer := (
        With Y(tablenum,capacity) AS (
            SELECT Tables.tablenum,Tables.capacity  FROM 
            Tables 
            WHERE Tables.userid = NEW.Restaurant_UserID
            AND Tables.location = NEW.location
            AND Tables.capacity >= NEW.pax
            EXCEPT
            SELECT Tables.tablenum,Tables.capacity FROM 
            Tables INNER JOIN Reservation
            ON
            Tables.tablenum = Reservation.tablenum
            AND Tables.location = Reservation.location
            AND Tables.userid = Reservation.Restaurant_UserID
            WHERE
            (bookingtimestart, bookingtimeend) OVERLAPS (Reservation.datetime, Reservation.datetime + interval '2 hours')
            AND Tables.userid = NEW.Restaurant_UserID
            AND Tables.location = NEW.location
            ORDER BY
            Tablenum
        )
        SELECT tablenum 
        from Y
        ORDER BY
        capacity
        LIMIT 1

    );
    BEGIN

    IF NEW.tablenum IS NULL
    THEN
    NEW.tablenum = autotable;
    END IF;

    IF NEW.tablenum IS NULL
    THEN
    RAISE EXCEPTION 'no available tables' USING HINT = 'no available tables';
    END IF;

    --checking if special opening time violated
    IF EXISTS(
        SELECT 1 FROM
        Special_Operating_Hrs
        WHERE
        NEW.Restaurant_UserID = Special_Operating_Hrs.UserID
        AND NEW.Location = Special_Operating_Hrs.Location
        AND dayofweek = Special_Operating_Hrs.Day_of_week
        AND 
        (
            bookingtimestart < (dateofbooking + Special_Operating_Hrs.Opening_hours)
            OR
            bookingtimeend > (dateofbooking + Special_Operating_Hrs.Closing_hours)
        )
    )
    THEN
    RAISE EXCEPTION 'Shop not open Special' USING HINT = 'Shop not open Special';

    --checking if normal opening time violated
    ELSIF EXISTS(
        SELECT 1 FROM
        Restaurant
        WHERE
        NEW.Restaurant_UserID = Restaurant.UserID
        AND NEW.Location = Restaurant.Location
        AND dayofweek <> ALL (
            SELECT Special_Operating_Hrs.Day_of_week as dw
            FROM Special_Operating_Hrs
            NEW.Restaurant_UserID = Special_Operating_Hrs.UserID
            AND NEW.Location = Special_Operating_Hrs.Location
        )
        AND 
        (
            bookingtimestart < (dateofbooking + Restaurant.Opening_hours)
            OR
            bookingtimeend > (dateofbooking + Restaurant.Closing_hours)
        )
    )
    THEN
    RAISE EXCEPTION 'Shop not open Normal' USING HINT = 'Shop not open Normal';

    --checking if double book violated
    ELSIF EXISTS(
        SELECT 1 FROM
        Reservation
        WHERE
        NEW.Customer_UserID = Reservation.Customer_UserID
        AND (bookingtimestart, bookingtimeend) OVERLAPS (Reservation.datetime, Reservation.datetime + interval '2 hours')
    )
    THEN
    RAISE EXCEPTION 'Doublebooked' USING HINT = 'Doublebooked';

    --checking if seat is available
    ELSIF EXISTS(
        SELECT 1 FROM
        Reservation
        WHERE
        NEW.TableNum = Reservation.TableNum
        AND  NEW.Restaurant_UserID = Reservation.Restaurant_UserID
        AND NEW.Location = Reservation.Location
        AND (bookingtimestart, bookingtimeend) OVERLAPS (Reservation.datetime, Reservation.datetime + interval '2 hours')
    )
    THEN
    RAISE EXCEPTION 'SorrySeatTaken' USING HINT = 'SorrySeatTaken';
    END IF;

    RETURN NEW;
    END;
$ReservationConstraints$ LANGUAGE plpgsql;


CREATE TRIGGER ReservationConstraintsTrigger
BEFORE INSERT ON Reservation
    FOR EACH ROW EXECUTE FUNCTION ReservationConstraints();



--trigger checking if the User is already a franchiseowner
CREATE OR REPLACE FUNCTION User_Customer_constraint()
RETURNS TRIGGER AS $$
DECLARE count integer:=(
    SELECT COUNT(*)
    FROM FranchiseOwner 
    WHERE NEW.UserID = FranchiseOwner.UserID
);
BEGIN 
IF count > 0 THEN 
    RAISE EXCEPTION 'UserID already used as FranchiseOwner' USING HINT = 'UserID already used as FranchiseOwner';
ELSE 
    RETURN NEW;
END IF; 
END;
$$ LANGUAGE plpgsql;

--trigger checking if the User is already a customer
CREATE OR REPLACE FUNCTION User_FranchiseOwner_constraint()
RETURNS TRIGGER AS $$
DECLARE count integer:=(
    SELECT COUNT(*)
    FROM Customer
    WHERE NEW.UserID = Customer.UserID
);
BEGIN 
IF count > 0 THEN 
    RAISE EXCEPTION 'UserID already used as Customer' USING HINT = 'UserID already used as Customer';
ELSE 
    RETURN NEW;
END IF; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER non_franchiseowner
BEFORE INSERT OR UPDATE 
ON Customer
FOR EACH ROW 
EXECUTE FUNCTION User_Customer_constraint();

CREATE TRIGGER non_customer
BEFORE INSERT OR UPDATE 
ON FranchiseOwner
FOR EACH ROW 
EXECUTE FUNCTION User_FranchiseOwner_constraint();

CREATE OR REPLACE FUNCTION CapacityForRestaurants()
RETURNS TRIGGER AS $$
DECLARE cap integer:=(
    SELECT coalesce(SUM(tables.capacity),0)
    FROM tables
    WHERE New.UserID = tables.UserID
    AND NEW.location = tables.location
);
BEGIN 
new.capacity = cap;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION CapacityForTables()
RETURNS TRIGGER AS $$
DECLARE cap integer:=(
    SELECT coalesce(SUM(tables.capacity),0)
    FROM tables
    WHERE New.UserID = tables.UserID
    AND NEW.location= tables.location
);
BEGIN
UPDATE
Restaurant
SET capacity = cap
WHERE
Restaurant.userid = new.userid
AND Restaurant.location = new.location;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tablecap
AFTER INSERT OR DELETE OR UPDATE
ON tables
FOR EACH ROW 
EXECUTE FUNCTION CapacityForTables();



CREATE TRIGGER rescap
AFTER INSERT OR UPDATE 
ON restaurant
FOR EACH ROW 
WHEN(pg_trigger_depth() = 0)
EXECUTE FUNCTION CapacityForRestaurants();



CREATE OR REPLACE FUNCTION givepoints()
RETURNS TRIGGER AS $$
BEGIN 
IF OLD.rating IS NULL
THEN
UPDATE
customer
SET points = points + (
    SELECT ROUND(CAST(AVG(Food.Price) as numeric)) AS p
    FROM Food
    WHERE Food.Location = old.Location
    AND Food.UserID = old.Restaurant_UserID
    ) 
WHERE
old.customer_userid = customer.userid;
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER addpoints
BEFORE UPDATE ON Reservation
    FOR EACH ROW EXECUTE FUNCTION givepoints();



`
const downSQL =
`
DROP TABLE IF EXISTS FranchiseOwner CASCADE; 
DROP TABLE IF EXISTS Restaurant CASCADE;
DROP TABLE IF EXISTS Food CASCADE;
DROP TABLE IF EXISTS Tables CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Reservation Cascade; 
DROP TABLE IF EXISTS Account Cascade; 
DROP TABLE IF EXISTS Special_Operating_Hrs Cascade;
DROP TABLE IF EXISTS Customer_voucher Cascade; 
DROP TABLE IF EXISTS Possible_voucher Cascade;
DROP TABLE IF EXISTS Ratings Cascade; 
DROP FUNCTION IF EXISTS test;
DROP FUNCTION IF EXISTS attemptReserve;
DROP TRIGGER IF EXISTS ReservationConstraintsTrigger on Reservation;
DROP FUNCTION IF EXISTS ReservationConstraints;
DROP TRIGGER IF EXISTS non_franchiseowner on Customer;
DROP FUNCTION IF EXISTS User_Customer_constraint;
DROP TRIGGER IF EXISTS non_customer on FranchiseOwner;
DROP FUNCTION IF EXISTS User_FranchiseOwner_constraint;

DROP TRIGGER IF EXISTS tablecap on tables;
DROP FUNCTION IF EXISTS CapacityForTables;

DROP TRIGGER IF EXISTS rescap on restaurant;
DROP FUNCTION IF EXISTS CapacityForRestaurants;

DROP TRIGGER IF EXISTS addpoints on reservation;
DROP FUNCTION IF EXISTS givepoints;

`
exports.up = function(knex) {
    return knex.schema
    .dropTableIfExists('Booking')
    .dropTableIfExists('Customer')
    .dropTableIfExists('Seating')
    .dropTableIfExists('Seating')
    .dropTableIfExists('Food')
    .dropTableIfExists('Restaurant')
    .dropTableIfExists('Area')
    .dropTableIfExists('Franchisor') //These statements remove the old knex stuff
    .raw(upSQL);
};

exports.down = function(knex) {
    return knex.schema
    .raw(downSQL);
};

const lol =
`

CREATE OR REPLACE FUNCTION test(x integer) RETURNS void AS $test$
    DECLARE
    _temp_cur1 refcursor = 'unique_name_of_temp_cursor_1';
    xpax integer :=x;
    xRestaurant_UserID varchar (100):='DeandreSubsistenceaccount';
    xlocation varchar (200):='35 Paya Lebar Rise #46-516 Singapore083184';
    bookingtimestart timestamp with time zone := date_trunc('minute', TIMESTAMP WITH TIME ZONE  '2019-11-20 13:00:00+08');
    bookingtimeend timestamp with time zone := date_trunc('minute', TIMESTAMP WITH TIME ZONE '2019-11-20 13:00:00+08') + interval '2 hour';
    autotable integer := (
        With Y(tablenum,capacity) AS (
            SELECT Tables.tablenum,Tables.capacity  FROM 
            Tables 
            WHERE Tables.userid = xRestaurant_UserID
            AND Tables.location = xlocation
        EXCEPT
            SELECT Tables.tablenum,Tables.capacity FROM 
            Tables INNER JOIN Reservation
            ON
            Tables.tablenum = Reservation.tablenum
            AND Tables.location = Reservation.location
            AND Tables.userid = Reservation.Restaurant_UserID
            WHERE
            Reservation.Restaurant_UserID = xRestaurant_UserID
            AND Tables.location = xlocation
            ORDER BY
            Tablenum
        )
        SELECT tablenum 
        from Y
        ORDER BY
        capacity
        LIMIT 1
        offset 1
    );
    BEGIN
    RAISE NOTICE 'start: (%) FOUND', bookingtimestart;
    RAISE NOTICE 'end: (%) FOUND', bookingtimeend;
    RAISE NOTICE 'end: (%) FOUND', bookingtimestart NOT BETWEEN bookingtimestart AND bookingtimeend;
    IF autotable IS NOT NULL THEN
        RAISE NOTICE 'DAy: (%) FOUND', autotable;
    ELSIF autotable IS NULL THEN
        RAISE NOTICE 'NOT FOUND';
    END IF;
    END;
$test$ LANGUAGE plpgsql;


--soecial
INSERT INTO Reservation
VALUES
('PeterLoth96',0,'45 Nanyang View #21-253 Singapore993602','PappanCookingaccount',1,'2004-10-18 2:30:00+08')


--normal
INSERT INTO Reservation
VALUES
('PeterLoth96',0,'45 Nanyang View #21-253 Singapore993602','PappanCookingaccount',1,'2004-10-19 2:30:00+08')

--dobule
INSERT INTO Reservation
VALUES
('PeterLoth96',0,'45 Nanyang View #21-253 Singapore993602','PappanCookingaccount',1,'2004-10-19 10:30:00+08')
INSERT INTO Reservation
VALUES
('PeterLoth96',0,'97 Gul Close #91-476 Singapore060377','PappanCookingaccount',1,'2004-10-19 11:30:00+08')


SELECT * from reservation limit 1;
select * from tables where tables.location = '35 Paya Lebar Rise #46-516 Singapore083184';
select * from reservation where reservation.location = '35 Paya Lebar Rise #46-516 Singapore083184';

--no available tables
INSERT INTO Reservation
VALUES
('PeterLoth96',NULL,'35 Paya Lebar Rise #46-516 Singapore083184','DeandreSubsistenceaccount',19,'2019-11-20 14:00:00+08')
INSERT INTO Reservation
VALUES
('EllaMathieson27',NULL,'35 Paya Lebar Rise #46-516 Singapore083184','DeandreSubsistenceaccount',19,'2019-11-20 14:00:00+08')


`
