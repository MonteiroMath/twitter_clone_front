import React from "react";
import { FormGroup, Input, Label, Button, Row, Col } from "reactstrap";

//!todo continue poll form
function PollForm({
  poll,
  handlePoll,
  choices,
  handleChoices,
  pollLength,
  handlePollLength,
}) {
  function generateOptions(prefix, max) {
    let options = [];
    for (let i = 0; i <= max; i++) {
      options.push(<option key={`${prefix}${i}`}>{i}</option>);
    }

    return options;
  }

  return poll ? (
    <div className="mt-3 cpollForm">
      <FormGroup>
        <Input
          placeholder="Choice 1"
          value={choices[0]}
          onChange={(evt) => handleChoices(evt, 0)}
        />
        <Input
          className="mt-2"
          placeholder="Choice 2"
          value={choices[1]}
          onChange={(evt) => handleChoices(evt, 1)}
        />
      </FormGroup>
      <FormGroup row>
        <Col xs={12}>
          <p className="cBold">Poll length</p>
        </Col>
        <Col>
          <Label className="cfontSmall" for="days">
            Days
          </Label>
          <Input
            name="days"
            type="select"
            value={pollLength.days}
            onChange={(evt) => handlePollLength(evt, "days")}
          >
            {generateOptions("day", 7)}
          </Input>
        </Col>
        <Col>
          <Label className="cfontSmall" for="hours">
            Hours
          </Label>
          <Input
            name="hours"
            type="select"
            value={pollLength.hours}
            onChange={(evt) => handlePollLength(evt, "hours")}
          >
            {generateOptions("hours", 23)}
          </Input>
        </Col>
        <Col>
          <Label className="cfontSmall" for="minutes">
            Minutes
          </Label>
          <Input
            name="minutes"
            type="select"
            value={pollLength.minutes}
            onChange={(evt) => handlePollLength(evt, "minutes")}
          >
            {generateOptions("minutes", 59)}
          </Input>
        </Col>
      </FormGroup>
      <Row className="d-flex">
        <Button className="mx-auto" color="danger" outline onClick={handlePoll}>
          Remove poll
        </Button>
      </Row>
    </div>
  ) : null;
}

export default PollForm;
