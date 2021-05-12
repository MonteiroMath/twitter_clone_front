import React from "react";
import { Button, Row } from "reactstrap";

function TopicSection(props) {
  const { topic, genre } = props.content;

  return (
    <a href="#">
      <Row className="border-bottom p-2" noGutters>
        <div>
          <div className="text-dark cfw-bolder">{topic}</div>
          <div className="cfs-small text-black-50">{genre}</div>
        </div>
        <div className="ml-auto">
          <Button color="info" size="sm" outline rounded>
            Follow
          </Button>
        </div>
      </Row>
    </a>
  );
}

export default TopicSection;
