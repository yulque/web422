import { useState, useEffect } from "react";
import queryString from "query-string";
import { Card, ListGroup } from "react-bootstrap";

export default function Restaurants(props) {
  const perPage = 10;
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);

  const parsed = queryString.parse(props.query);
  const borough = parsed.borough ? `&borough=${parsed.borough}` : ``;
  useEffect(() => {
    fetch(
      `http://yurisweb422.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${borough}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data from json", data);
        setRestaurants(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const previousPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Card className="cardRestaurantList">
        <Card.Header>
          <h3>Restaurant List</h3>
          Full list of restaurants you searched
        </Card.Header>
      </Card>
      <ListGroup>
        {
          restaurants ? (
            restaurants.map((res) => (
              <ListGroup.Item key={res._id}>
                {res.name +
                  res.borough +
                  res.address.building +
                  res.address.street +
                  res.cuisine}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item value="l"></ListGroup.Item>
          )
          // restaurants.map((restaurant) => {
          //   <ListGroup.Item value={restaurant.id}></ListGroup.Item>;
          // });}
        }
      </ListGroup>
    </>
  );
}
