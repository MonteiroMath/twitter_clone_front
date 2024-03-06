import React from "react";
import { Card, CardTitle, CardBody, CardFooter } from "reactstrap";

function RightBarCard(props) {
  const { placeholders, title, SectionComponent } = props;

  let content = placeholders.map((ph, i) => (
    <SectionComponent key={i} content={ph} />
  ));

  return (
    <Card className="mt-3 croundCorners cnoBorder" color="light">
      <CardTitle className="border-bottom p-3 mb-0 h5">
        <span>{title}</span>
      </CardTitle>
      <CardBody className="p-0">{content}</CardBody>
      <a href="/#" className="link-info">
        <CardFooter className="croundBottom cnoBorder">Show More</CardFooter>
      </a>
    </Card>
  );
}

export default RightBarCard;
