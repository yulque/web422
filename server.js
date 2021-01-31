/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Yu Ri Yoon / Student ID: 135023190 / Date: 22 Jan 2021
 * Heroku Link: http://yurisweb422.herokuapp.com/
 *
 ********************************************************************************/

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const process = require("process");
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(process.env.MONGODB_CONN_STRING);

app.use(cors());
app.use(bodyParser.json());

db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on:: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  });

app.get("/", (req, res) => {
  if (req.accepts("html") == "html") {
    res.sendFile(path.join(__dirname, "/index.html"));
  } else if (req.accepts("json") == "json") {
    res.json({ message: "API Listening" });
  }
});

//Get all restaurants
app.get("/api/restaurants", (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

// Get one restaurant
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

// Add new restaurant
app.post("/api/restaurants", (req, res) => {
  // must return http 201
  db.addNewRestaurant(req.body)
    .then((data) => {
      res.status(201).json({ message: data });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: `Failed to add a new restaurant: ${req.body.name}` });
    });
});

// Edit existing restaurant
app.put("/api/restaurants/:id", (req, res) => {
  // this route expects a JSON object in the body like id, name
  db.updateRestaurantById(req.body, req.params.id)
    .then((data) => {
      res.status(204).json({ message: data });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: `Failed to update item with id: ${req.params.id}` });
    });
});

// delete restaurant
app.delete("api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Failed to delete restaurant with id ${req.params.id}`,
      });
    });
});

// resource not found
app.use((req, res) => {
  res.status(404).send("Resource not found");
});
