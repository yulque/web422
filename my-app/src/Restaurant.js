import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
export default function Restaurant() {
  let { id } = useParams();
  return <p>Restaurant id: {id}</p>;
}
