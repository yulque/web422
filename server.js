const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const process = require("process");
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const restaurantDB = require("./modules/restaurantDB");

const mongo = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");
const RestaurantDB = require("./modules/restaurantDB.js");
const Mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");
const Schema = Mongoose.Schema;
const db = new RestaurantDB(
  "mongodb+srv://yulque:db0024fl@cluster0.falxp.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on:: ${HTTP_PORT}`);
    });
  })
  .catch((err) => console.log(err));

// get all
app.get("/api/restaurants", (req, res) => {
  console.log(req.params.page);
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: `fetch requested restaurants` });
    })
    .catch((err) => console.log(err));
});

// get one
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: `get restaurant with identifier: ${req.params.id}`,
        info: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// add new
app.post("/api/restaurants", (req, res) => {
  // must return http 201
  db.addNewRestaurant(req.body)
    .then((data) => {
      console.log(data);
      res
        .status(201)
        .json({ message: `added a new restaurant: ${req.body.name}` });
    })
    .catch((err) => console.log(err));
});

// edit existing
app.put("/api/restaurants/:id", (req, res) => {
  // this route expects a JSON object in the body like id, name
  db.updateRestaurantById(req.body, req.params.id)
    .then((data) => {
      console.log(data);
      res.json({ message: `updated item with id: ${req.params.id} to db` });
    })
    .catch((err) => console.log(err));
});

// delete restaurant
app.delete("api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: `deleted restaurant with id ${req.params.id}` });
    })
    .catch((err) => console.log(err));
});

// resource not found
app.use((req, res) => {
  res.status(404).send("Resource not found");
});
