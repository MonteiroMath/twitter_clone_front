import React from "react";
import { Col } from "reactstrap";

import SearchBar from "./SearchBar";
import WhatsHappening from "./WhatsHappening";
import TopicsToFollow from "./TopicsToFollow";
import RightBarSection from "./RightBarSection";

import WtF_Section from "./WtF_Section";

function RightBar(props) {
  return (
    <Col className="d-none d-lg-block p-2" lg="3">
      <SearchBar />
      <WhatsHappening />
      <TopicsToFollow />
      <RightBarSection
        title="Who to Follow"
        placeholders={WtF_placeholders}
        SectionComponent={WtF_Section}
      />
    </Col>
  );
}

const WtF_placeholders = [
  {
    name: "Famous_person_781",
  },
  {
    name: "Forgotten_friend_02",
  },
  {
    name: "No_Idea_Who_This_Is_9872",
  },
  {
    name: "This_weeks_web_celebrity",
  },
  {
    name: "Friend_of_a_friend_of_a_friend_16",
  },
];

export default RightBar;
