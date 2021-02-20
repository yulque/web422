import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import { Card, CardDeck, Spinner } from "react-bootstrap";

export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://yurisweb422.herokuapp.com/api/restaurants/${props.id}`)
      .then((res) => {
        console.log("res is ", res);
        return res.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          console.log(restaurant);
          setRestaurant(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card class="card border-info mb-3 text-center">
        <Card.Body>
          {" "}
          <Spinner animation="border" variant="info" />
          Loading your restaurant...
        </Card.Body>
      </Card>
    );

  if (restaurant == null)
    return (
      <Card class="card border-info mb-3">
        <Card.Body>Unable to find Restaurant with id: {props.id}</Card.Body>
      </Card>
    );

  return (
    <>
      <Card className="RestaurantInfo">
        <Card.Body>
          <Card.Title>
            <h3>{restaurant.name}</h3>
            <p>
              {restaurant.address.building + " " + restaurant.address.street}
            </p>
          </Card.Title>
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
        </Card.Body>
      </Card>
      <CardDeck className="RestaurantGrade">
        {restaurant.grades.map((grade) => {
          console.log(grade);
          return (
            <Card key={grade.date} bg="light" className="grade">
              <Card.Text>Grade: {grade.grade}</Card.Text>
              <Card.Text>Completed: {grade.date.slice(0, 10)}</Card.Text>
            </Card>
          );
        })}
      </CardDeck>
    </>
  );
}
