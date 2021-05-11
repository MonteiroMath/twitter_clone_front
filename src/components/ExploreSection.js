import React from "react";

function ExploreSection(props) {
  const { content } = props;

  

  return (
    <a href="#">
      <div className="border-bottom p-2">
        <div>
          <span className="cfs-small text-black-50">tag1 tag2 tag3</span>
        </div>
        <div className="text-dark cfw-bolder">Lorem Ipsum</div>
        <div className="cfs-small text-black-50">3 Tweets</div>
      </div>
    </a>
  );
}

export default ExploreSection;
