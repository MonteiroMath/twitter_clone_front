import React from "react";
import { FormGroup, Input, Label, Button, Row, Col } from "reactstrap";

function generateTimeOptions(prefix, max) {
  let options = [];
  for (let i = 0; i <= max; i++) {
    options.push(<option key={`${prefix}${i}`}>{i}</option>);
  }

  return options;
}

function PollForm({
  poll,
  handlePoll,
  choices,
  handleChoices,
  pollLength,
  handlePollLength,
}) {
  if (poll) {
    var dayOpt = generateTimeOptions("day", 7);
    var hourOpt = generateTimeOptions("hours", 23);
    var minOpt = generateTimeOptions("minutes", 59);
  }

  return poll ? (
    <div className="mt-3 cpollForm">
      <FormGroup>
        <Input
          aria-label="choice 1"
          placeholder="Choice 1"
          value={choices[0]}
          onChange={(evt) => handleChoices(evt, 0)}
        />
        <Input
          aria-label="choice 2"
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
            id="days"
            name="days"
            type="select"
            value={pollLength.days}
            onChange={(evt) => handlePollLength(evt, "days")}
          >
            {dayOpt}
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
            {hourOpt}
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
            {minOpt}
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
