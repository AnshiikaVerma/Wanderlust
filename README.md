# Airbnb Clone

A full-stack Airbnb-inspired accommodation platform that allows users to explore, create, edit, and review property listings.

## Features

- User Authentication (Signup/Login/Logout)
- Secure Session Management
- Property Listing CRUD Operations
- Image Uploads using Cloudinary
- Reviews and Ratings System
- Form Validation using Joi
- Flash Messages for User Feedback
- Centralized Error Handling
- MVC Architecture
- Responsive UI using Bootstrap and EJS

## Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Express Session

### Cloud Services
- Cloudinary

### Other Tools
- Multer
- Joi
- Connect Flash
- Method Override

## Project Structure

controllers/
models/
routes/
views/
public/
utils/

## Installation

1. Clone the repository

git clone https://github.com/AnshiikaVerma/Full-Stack-Airbnb-Clone.git

2. Navigate to project directory

cd Full-Stack-Airbnb-Clone

3. Install dependencies

npm install

4. Create .env file

ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_secret

SECRET=session_secret

5. Start server

node app.js

## Future Improvements

- Booking functionality
- Payment Gateway Integration
- Wishlist Feature
- Advanced Search and Filters
- User Profile Management
- Admin Dashboard

## Author

Anshika Verma
