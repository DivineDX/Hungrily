# Project Hungrily
CS2102 Project, Topic E: Restaurant Reservation.

Team Members:
Chia De Xun
Phaedra Tan Yee Joo
Qiu Tian Hao
Sean Tan

## Product Introduction
__Hungrily__ is a full stack Web Application Milestone Project done by students of the CS2102 Database Systems module at the National University of Singapore. This project demonstrate our learning and progress in deploying a complex database system as part of a web application. The database consists of multiple complex queries, triggers, and a well designed schema that demonstrates our learning outcomes in the module.

__Hungrily__ is a restaurant reservation application that allows diners to book reservations at restaurants, similar to <a href = "https://www.chope.co/">Chope</a>. Restaurants can advertise their availability (e.g., cuisine type, branch locations, opening hours, menu prices, etc) and diners can search for restaurants to book reservations by providing various information (e.g., date and time, cuisine type, number of people, preferred locations, etc) and rate restaurants based on their dining experience. Each reservation booking is confirmed based on various criteria (e.g., booking time, availability, number of diners, etc). Diners could cancel and make edits to their reservations. __Hungrily__ provides for various incentives through the use of points given after reviews to attract and maintain customer loyalty.

Our App is deployed and viewable on https://hungrily.herokuapp.com/. 
The server is hosted on https://hungrily-server.herokuapp.com/. (__Buggy as of this time, will be fixed in coming days__)
Note that because we are running on a free plan on Heroku, it will go to sleep in 30mins if there is no usage. Therefore, if it is the first time you are visiting the website, do note that it may take a few mins for it to wake and boot-up.

If you're navigating through the website and no queries are working, try going to https://hungrily-server.herokuapp.com/ to 'wake' the server up. Our frontend is not able to function without the back-end server. Then, go back to the <a href = "https://hungrily.herokuapp.com/">main page</a> which should be working now.


## Tech Stack
* ReactJS
* ExpressJS
* NodeJS
* PostgreSQL

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

3. Start the React Web App. This starts the web client on localhost:3000
```sh
npm start or yarn start
```

4. Change your directory to ./backend-server and install NPM Packages
```sh
npm install or yarn install
```

5. Change your directory to ./DBConfig. Run psql < HungrilyPSQLUserCreation on the Terminal. This creates the superuser that will have access to the database

6. Run psql hungrilydb < hungrilydb.sql. This initializes the database schema and inserts the large datasets.

7. Start the backend server 
```sh
npm start or yarn start
```

8. The Full Stack Web App should now be working and functioning on your localhost.