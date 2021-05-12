import React from "react";

function WtF_Section(props) {
  const { name } = props.content;

  return (
    <a href="#">
      <div className="border-bottom p-2">
        <div className="text-dark cfw-bolder">{name}</div>
        <div className="cfs-small text-black-50">{"@" + name}</div>
      </div>
    </a>
  );
}

export default WtF_Section;
