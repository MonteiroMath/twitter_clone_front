import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

function SearchBar(props) {
  return (
    <Form>
      <FormGroup>
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
