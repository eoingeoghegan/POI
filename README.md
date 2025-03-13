# Placemark Full Stack Assignment
- Student Name: Eoin Geoghegan
- Student ID: 20036009

# Where to go
- Link to Glitch: https://eoingeoghegan-poi.glitch.me/
- Username: homer@mail.com
- Password: homer

# Project:

- "A point of interest (POI) is a location for which information is available. A POI can be as simple as a set of coordinates, a name, and a unique identifier, or more complex, such as a three-dimensional model of a building with names in multiple languages, information about opening and closing hours, and a civic address. POI data has many applications, including augmented reality browsers, location-based social networking games, geocaching, mapping, and navigation systems." Source.

- This application allows users to register, sign in, and manage points of interest (POI) in various categories (walks). After logging in, users can create, view, and update their walks and routes, as well as manage their account information. The app also includes basic admin features for user management and provides an API for interacting with the data. The application has three storeTypes, Memory, JSON and MongoDB for storing all the details.

# Technologies Used
- Node.js
- Hapi.js
- MongoDB (optional for storing data)
- Glitch for deployment
- Postman for API testing
- Joi for validation

# Installation and Setup
Clone the repository or import the project to your Glitch account.


Install necessary dependencies by running:
npm install

To run the application:
npm run start


# Usage
- Sign Up / Log In: Create an account or log into an existing account using your email and password.
- User Dashboard: After login, you’ll be directed to your personal dashboard where you can add and view categories.
- Admin Page: Unprotected and accessible by anyone, this page shows a list of users and allows user to delete users.
- Create API Requests: Use Postman to interact with the API to manage users (create, retrieve, delete).

# API Documentation
Here are the available API endpoints for interacting with the user data:

- GET /api/users - Retrieve all users
- POST /api/users - Create a new user
- DELETE /api/users/{id} - Delete a user by ID

GET /api/users
Response:




# Known Issues
Issue 1: When adding a placemarker if incorrect details are added then it will show errors due to JOI.  From here if the correct details are are entered, the form might not reset and an error screen will show. Reload the page and try again and this will work.



