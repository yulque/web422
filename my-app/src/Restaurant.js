import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";

export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://yurisweb422.herokuapp.com/api/restaurant/${props.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let { id } = useParams();
  return <p>Restaurant id: {id}</p>;
}
