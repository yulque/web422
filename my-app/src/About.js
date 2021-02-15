import { Card } from "react-bootstrap";
import aboutImage from "./about.jpg";

export default function About() {
  return (
    <Card className="About">
      <Card.Img variant="top" src={aboutImage} />
      <Card.Body>
        <Card.Title>About me</Card.Title>
        <Card.Text>
          Hi! I'm just a foodie/developer who loooves yummy food. Let's find out
          your best restaurant here! Ready?
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
