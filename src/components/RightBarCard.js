import React from "react";
import { Card, CardTitle, CardBody, CardFooter } from "reactstrap";

function RightBarCard(props) {
  const { title, content } = props;

  return (
    <Card className="mt-3">
      <CardTitle className="border-bottom p-3 mb-0 h5">
        <span>{title}</span>
      </CardTitle>
      <CardBody className="p-0">{content}</CardBody>
      <a href="#" className="link-info">
        <CardFooter>Show More</CardFooter>
      </a>
    </Card>
  );
}

export default RightBarCard;
