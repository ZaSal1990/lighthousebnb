# LightBnB Project
This app is a mini clone of AirBnB. The app registers users as owners/guests, lets them make reservations or list their own properties. This app lets user make searches on user-defined criteria. This app stores session information for a user through suer cookies at the backend. A user, once logged-in, can see his/her name on the nav bar. Each listing shows average rating based on hard-coded rating at the moment. SQL tables contain column for user rating but the feature is not implemented as of right now. SQL table also accomodates status of a property but it is hard-coded at the moment.

SEARCH: lets user search properties by city, minimun/maximum cost and minimum rating. The city search field is capable of handling incomplete strings and match results using wildcard symbol at backend
CREATE LISTING: Lets user create their own listing  
MY LISTINGS: Displays listings for the logged-in user
MY RESERVATIONS: Displayes user reservations

## LightBnB ERD
!["LightBnB Entity Relation Diagram"](https://github.com/ZaSal1990/lighthousebnb/blob/main/LighthouseBnB_ERD.png)

## LightBnB Final Product
!["My Reservation Page"](https://github.com/ZaSal1990/lighthousebnb/blob/main/My_Reservations.png)
!["Create Listing Page"](https://github.com/ZaSal1990/lighthousebnb/blob/main/Create_Listing.png)


## Dependancies
Node.js
Express
bcrypt 
bcryptjs 
body-parser 
cookie-session 
express
nodemon 
pg

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` command from with-in LightBnB_WebApp-master.
- See webpage rendered on 'https://localhost:3000'