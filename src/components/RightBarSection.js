import React from "react";

import RightBarCard from "./RightBarCard";

function RightBarSection(props) {
  const { placeholders, title, SectionComponent } = props;

  let content = placeholders.map((ph, i) => (
    <SectionComponent key={i} content={ph} />
  ));

  return <RightBarCard title={title} content={content} />;
}

export default RightBarSection;
