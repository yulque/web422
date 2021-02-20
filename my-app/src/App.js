import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";

import "./App.css";

import About from "./About";
import Restaurant from "./Restaurant";
import Restaurants from "./Restaurants";
import NotFound from "./NotFound";
import { propTypes } from "react-bootstrap/esm/Image";

function App() {
  const [searchString, setSearchString] = useState("");
  let history = useHistory();
  const loc = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
            {/* inside of a single column grid*/}
            <Switch>
              <Route exact path="/">
                <Redirect to="/Restaurants" />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route
                path="/Restaurant/:id"
                render={(props) => <Restaurant id={props.match.params.id} />}
              ></Route>
              <Route
                path="/Restaurants"
                render={(props) => (
                  <Restaurants query={props.location.search} />
                )}
              />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
