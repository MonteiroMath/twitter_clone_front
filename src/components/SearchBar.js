import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

function SearchBar(props) {
  return (
    <Form className="sticky-top bg-white pt-1 pb-3">
      <FormGroup className="m-0">
        <Input
          name="SearchBar"
          className="searchBar pl-5 bg-light"
          type="text"
          placeholder="Search Twitter"
        />
      </FormGroup>
    </Form>
  );
}

export default SearchBar;
