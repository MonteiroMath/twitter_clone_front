import React from "react";
import { Card, CardTitle, CardBody, CardFooter } from "reactstrap";

import ExploreSection from "./ExploreSection";

//todo extract general card layout from specific functionality (exploresection)

function WhatsHappening(props) {
  return (
    <Card>
      <CardTitle className="border-bottom p-3 mb-0 h5">
        <span>What's Happening</span>
      </CardTitle>
      <CardBody className="p-0">
        <ExploreSection />
      </CardBody>
      <a href="#" className="link-info">
        <CardFooter>Show More</CardFooter>
      </a>
    </Card>
  );
}

export default WhatsHappening;
