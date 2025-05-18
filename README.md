# Placemark Full Stack Assignment
- Student Name: Eoin Geoghegan
- Student ID: 20036009

# Where to go
- Link to Glitch: https://poi-974z.onrender.com
- Username: homer@mail.com
- Password: a

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
- JWT
- Cloudinary


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
Updates
- Added API end points for Category and Placemarker which connects to Frontend.
- The user can now add images supported by cloudinary.
- Added JWT .

# API Documentation
Here are the available API endpoints for interacting with the user data:

 /api/users

- GET	/api/users	Get all users
- GET	/api/users/{id}	Get user by ID
- POST	/api/users	Create new user
- POST	/api/users/authenticate	Authenticate user, return JWT
- DELETE	/api/users	Delete all users

/api/categories

- GET	/api/categories	Get all categories for current user
- GET	/api/categories/{id}	Get a single category by ID
- POST	/api/categories	Create a new category
- DELETE	/api/categories	Delete all categories
- DELETE	/api/categories/{id}	Delete a specific category by ID
- POST	/api/categories/{id}/uploadimage	Upload image for a category

/api/placemarkers

- GET	/api/placemarkers	Get all placemarkers
- GET	/api/placemarkers/{id}	Get placemarker by ID
- POST	/api/placemarkers/{categoryId}	Add placemarker to category by ID
- DELETE	/api/placemarkers	Delete all placemarkers
- DELETE	/api/placemarkers/{id}	Delete a specific placemarker by ID

 Authentication
- Register user: POST /api/users
- Login & get token: POST /api/users/authenticate




# Known Issues
Issue 1: When adding a placemarker if incorrect details are added then it will show errors due to JOI.  From here if the correct details are are entered, the form might not reset and an error screen will show. Reload the page and try again and this will work.



