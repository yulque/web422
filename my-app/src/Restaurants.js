import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { Card, ListGroup, Pagination } from "react-bootstrap";

export default function Restaurants(props) {
  const perPage = 10;
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  let history = useHistory();

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
  }, [page]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  if (!restaurants)
    return <ListGroup.Item>Loading Restaurants...</ListGroup.Item>;

  if (restaurants.length == 0)
    return <ListGroup.Item>Not Found.</ListGroup.Item>;

  return (
    <>
      <Card className="restaurantListHeader">
        <Card.Header>
          <h3>Restaurant List</h3>
          Full list of restaurants you searched
        </Card.Header>
      </Card>
      <ListGroup className="restaurantList" horizontal>
        <ListGroup.Item className="listName" variant="dark">
          Name
        </ListGroup.Item>
        <ListGroup.Item className="listAddress" variant="dark">
          Address
        </ListGroup.Item>
        <ListGroup.Item className="listBorough" variant="dark">
          Borough
        </ListGroup.Item>
        <ListGroup.Item className="listCuisine" variant="dark">
          Cuisine
        </ListGroup.Item>
      </ListGroup>

      {restaurants.map((res) => (
        <ListGroup
          className="restaurantList"
          onClick={() => {
            history.push(`/restaurant/${res._id}`);
          }}
          horizontal
          key={res._id}
        >
          <ListGroup.Item className="listName">{res.name}</ListGroup.Item>
          <ListGroup.Item className="listAddress">
            {res.address.building + " " + res.address.street}
          </ListGroup.Item>
          <ListGroup.Item className="listBorough">{res.borough}</ListGroup.Item>
          <ListGroup.Item className="listCuisine">{res.cuisine}</ListGroup.Item>
        </ListGroup>
      ))}
      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </>
  );
}
