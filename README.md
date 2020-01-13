<p align = 'center'>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/KNV3sLG/Logo.png" alt="Logo" border="0"></a>
</p>

# Project Hungrily

CS2102 Project, Topic E: Restaurant Reservation.

Team Members:
Chia De Xun, Phaedra Tan Yee Joo, Qiu Tian Hao, Sean Tan

## Product Introduction

**Hungrily** is a full stack Web Application Milestone Project done by students of the CS2102 Database Systems module at the National University of Singapore. This project demonstrate our learning and progress in deploying a complex database system as part of a web application. The database consists of multiple complex queries, triggers, and a well designed schema that demonstrates our learning outcomes in the module.

**Hungrily** is a restaurant reservation application that allows diners to book reservations at restaurants, similar to <a href = "https://www.chope.co/">Chope</a>. Restaurants can advertise their availability (e.g., cuisine type, branch locations, opening hours, menu prices, etc) and diners can search for restaurants to book reservations by providing various information (e.g., date and time, cuisine type, number of people, preferred locations, etc) and rate restaurants based on their dining experience. Each reservation booking is confirmed based on various criteria (e.g., booking time, availability, number of diners, etc). Diners could cancel and make edits to their reservations, as well as rate their dining experiences should they wish to do so. **Hungrily** provides for various incentives through the use of points given after reviews to attract and maintain customer loyalty.

Besides this, **Hungrily** also allows franchise owners to view information on their restaurants and their corresponding reservations. Franchise Owners are also able to see the most loyal customer for each of their restaurants, should there be one.

Feel free to view our full <a href = "https://drive.google.com/open?id=1VKaZ2MEAUhrwOeLcxzDOTLyQVZwv_lld">project report </a> for more detailed information

## Database

<p align = 'center'>
<a href="https://ibb.co/m0hcVz3"><img src="https://i.ibb.co/ZScMpT0/Final-Schema.png" alt="Final-Schema" border="0"></a>
</p>
<p align = 'center'><b>Entity Relationship Diagram</b></p>

The database has been loaded with random data exceeding 15000 rows across 10 tables.

### Notable Features

<details><summary>C.R.U.D</summary>
Hungrily features full CRUD functionality for Customers but limited CRUD functionality for Franchise Owners - they are not able to create restaurants or modify existing menu items or table seating on the portal. 
</details>

<details><summary>Determining Restaurant Compatability for Customers</summary>

Through a Customer's past reservation history, Hungrily is able to determine the customer's favourite cuisine preference and provide recommendations for restaurants that have a similar cuisine style.
</details>

<details><summary>Tracking Customer Loyalty</summary>

Franchise Owners can query for the most loyal customer of each restaurant, which is defined as the customer with the highest percentage of reservations in that particular restaurant and the raw number of times he/she visited.
</details>

<details><summary>Triggers</summary>

1. Check if booking is valid through conditions such as table capacity, timing with respect to restaurant operating hours, and prevents double booking in the same timeslot range.
2. Ensure customers can only give ratings for their reservations after the booking timing.
3. Award points to customers if they provided reviews for their reservation. The points awarded is based on the average of the restaurant's food price
</details>




## Tech Stack

-   ReactJS
-   ExpressJS
-   NodeJS
-   PostgreSQL

## Setup

Requirements: Have <a href = "https://nodejs.org/en/download/">NodeJS</a>, <a href = "https://www.postgresql.org/download/">PostgreSQL</a> installed

1. Clone the repo

```sh
git clone https://github.com/DivineDX/Hungrily.git
```

2. Change your directory to ./frontend-web. Install NPM Packages

```sh
npm install or yarn install
```

3. Start the React Web App. This starts the web client on <b>localhost:3000</b>

```sh
npm start or yarn start
```

4. Change your directory to ./backend-server and install NPM Packages

```sh
npm install or yarn install
```

5. Change your directory to ./DBConfig. Run psql < HungrilyPSQLUserCreation on the Terminal. This creates the superuser that will have access to the database

6. Run psql hungrilydb < hungrilydb.sql. This initializes the database schema and inserts the large datasets.

7. Start the backend server. This starts the server on <b>localhost:3001</b>

```sh
npm start or yarn start
```

8. Hungrily should now be operating. If the database is initialized correctly, you should be able to login with existing accounts or create a new account (Customer accounts only). Existing accounts all have passwords '12345'. You may try logging in using the sample accounts listed below which have data pre-loaded.

```sh
Sample Customer UserID: ArianaBlizzard0
Sample FranchiseOwner UserID: AdahJunk-foodaccount
```
