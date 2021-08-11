import React from "react";

function ExploreSection(props) {
  const { tags, title, tweets } = props.content;

  return (
    <a href="/#">
      <div className="border-bottom p-2">
        <div>
          <span className="cfs-small text-black-50">{tags.join(" ")}</span>
        </div>
        <div className="text-dark cfw-bolder">{title}</div>
        <div className="cfs-small text-black-50">{tweets} Tweets</div>
      </div>
    </a>
  );
}

export default ExploreSection;
