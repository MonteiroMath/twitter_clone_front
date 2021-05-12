import React from "react";

import RightBarCard from "./RightBarCard";
import ExploreSection from "./ExploreSection";

const placeholders = [
  {
    tags: ["tag1", "tag2"],
    title: "Lorem Ipsum",
    tweets: 321,
  },
  {
    tags: ["tag3"],
    title: "Wingardium Leviosa",
    tweets: 32,
  },
  {
    tags: ["tag5", "tag6"],
    title: "Avada Kedavra",
    tweets: 452,
  },
  {
    tags: ["tag7", "tag8", "tag9"],
    title: "Worst ever",
    tweets: 1,
  },
  {
    tags: ["tag1"],
    title: "Bestest ever",
    tweets: 9999,
  },
];

function WhatsHappening(props) {
  let content = placeholders.map((ph, i) => (
    <ExploreSection key={i} content={ph} />
  ));

  return <RightBarCard title="What's Happening" content={content} />;
}

export default WhatsHappening;
