# Event Booking System (Node.js + MySQL)

A backend system to manage events and ticket bookings, built using Node.js, Express, and MySQL. This project demonstrates REST API design, database relationships, and handling real-world challenges like race conditions using transactions.

---

##  Features

*  Create and manage events
*  User-based ticket booking system
*  Prevents overbooking using **transactions & row-level locking**
*  Unique booking codes for each reservation
*  Retrieve user bookings
*  Event attendance validation using booking code
*  API documentation using Swagger (OpenAPI)

---

##  Key Highlights

* Implemented **MySQL transactions** to ensure atomic operations
* Prevented **race conditions** using `SELECT ... FOR UPDATE`
* Clean architecture with **routes & controllers separation**
* Proper relational database design with foreign keys
* Fully documented APIs with Swagger

---

##  Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Documentation:** Swagger (OpenAPI)
* **Testing:** Postman

---

##  Project Structure

```
event-booking-system/
│
├── config/            # Database connection
├── controllers/       # Business logic
├── routes/            # API routes
│
├── app.js             # Entry point
├── schema.sql         # Database schema
├── swagger.yaml       # API documentation
├── postman_collection.json
├── README.md
├── .env.example
```

---

##  Setup Instructions

###  Clone the repository

```
git clone <your-repo-link>
cd event-booking-system
```

---

###  Install dependencies

```
npm install
```

---

###  Setup environment variables

Create a `.env` file using `.env.example`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=******
DB_NAME=event_db
```

---

###  Setup Database

Run the SQL file:

```
CREATE DATABASE event_db;
USE event_db;
```

Then execute:

```
SOURCE schema.sql;
```

---

###  Run the server

```
node app.js
```

Server will run on:

```
http://localhost:3000
```

---

##  API Endpoints

###  Events

* **GET /events**
  Get all upcoming events

* **POST /events**
  Create a new event

---

###  Bookings

* **POST /bookings**
  Book tickets for an event

---

###  Users

* **GET /users/:id/bookings**
  Get all bookings of a user

---

###  Attendance

* **POST /events/:id/attendance**
  Validate entry using booking code

---

##  API Documentation

Swagger UI available at:

```
http://localhost:3000/api-docs
```

---

##  Testing

* Import the `postman_collection.json` into Postman
* Test all endpoints easily

---

##  Example Booking Flow

1. Create an event
2. Add a user (via DB or API)
3. Book tickets
4. Receive a unique booking code
5. Use the code to validate entry

---

##  Important Notes

* Transactions ensure **consistent ticket booking**
* Row-level locking prevents **double booking**
* `.env` file is not included for security reasons

---

##  Author

Ayush Kumar

---

##  Acknowledgment
<img width="1366" height="637" alt="image" src="https://github.com/user-attachments/assets/340e34f1-a13d-41b3-a489-001f04167f89" />

This project was developed as part of a backend developer selection test to demonstrate practical skills in API design, database management, and concurrency handling.
