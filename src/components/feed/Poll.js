import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";

//!todo continue poll form
function PollForm({ poll, handlePoll }) {
  const [choices, setChoices] = useState(["", ""]);

  function handleChange(evt, i) {
    const { value } = evt.target;

    let newState = [...choices];
    newState[i] = value;

    setChoices(newState);
  }

  function generateOptions(prefix, max) {
    let options = [];
    for (let i = 0; i <= max; i++) {
      options.push(<option key={`${prefix}${i}`}>{i}</option>);
    }

    return options;
  }

  return poll ? (
    <div className="mt-3 cpollForm">
      <Form>
        <FormGroup>
          <Input
            placeholder="Choice 1"
            value={choices[0]}
            onChange={(evt) => handleChange(evt, 0)}
          />
          <Input
            className="mt-2"
            placeholder="Choice 2"
            value={choices[1]}
            onChange={(evt) => handleChange(evt, 1)}
          />
        </FormGroup>
        <FormGroup row>
          <Col xs={12}>
            <p>Poll length</p>
          </Col>
          <Col>
            <Label for="days">Days</Label>
            <Input name="days" type="select">
              {generateOptions("day", 7)}
            </Input>
          </Col>
          <Col>
            <Label for="hours">Hours</Label>
            <Input name="hours" type="select">
              {generateOptions("hours", 23)}
            </Input>
          </Col>
          <Col>
            <Label for="minutes">Minutes</Label>
            <Input name="minutes" type="select">
              {generateOptions("minutes", 59)}
            </Input>
          </Col>
        </FormGroup>
      </Form>
      <Row className="d-flex">
        <Button className="mx-auto" color="danger" outline onClick={handlePoll}>
          Remove poll
        </Button>
      </Row>
    </div>
  ) : null;
}

export default PollForm;
