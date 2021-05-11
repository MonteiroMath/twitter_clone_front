import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function SearchBar(props) {
  return (
    <Form>
      <FormGroup>
        <Input
          name="SearchBar"
          className="searchBar pl-5"
          type="text"
          placeholder="Search Twitter"
        />
      </FormGroup>
    </Form>
  );
}

export default SearchBar;
