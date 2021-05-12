import React from "react";

import RightBarCard from "./RightBarCard";
import TopicSection from "./TopicSection";

const placeholders = [
  {
    topic: "Biology",
    genre: "Science",
  },
  {
    topic: "Movie News",
    genre: "News",
  },
  {
    topic: "Celebrities",
    genre: "Entertainment",
  },
  {
    topic: "Viral Tweets",
    genre: "Popular right now",
  },
];

function TopicsToFollow(props) {
  let content = placeholders.map((ph, i) => (
    <TopicSection key={i} content={ph} />
  ));

  return <RightBarCard title="Topics to Follow" content={content} />;
}

export default TopicsToFollow;
