import React from "react";

function TopicSection(props) {
  const { topic, genre } = props.content;

  return (
    <a href="#">
      <div className="border-bottom p-2">
        <div className="text-dark cfw-bolder">{topic}</div>
        <div className="cfs-small text-black-50">{genre}</div>
      </div>
    </a>
  );
}

export default TopicSection;
