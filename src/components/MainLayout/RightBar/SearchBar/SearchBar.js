import React from "react";
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

function SearchBar(props) {
  return (
    <Row className="sticky-top bg-white pt-1 pb-3" noGutters>
      <Col>
        <Form>
          <FormGroup className="m-auto">
            <Input
              name="SearchBar"
              className="searchBar pl-5 bg-light croundSides"
              type="text"
              placeholder="Search Twitter"
            />
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}

export default SearchBar;
