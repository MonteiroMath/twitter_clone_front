import React from "react";

function InfoBar(props) {
  const { username, created } = props;

  return (
    <div className="d-flex">
      <div className="font-weight-bold">{username}</div>
      <div className="text-secondary pl-2"> @{username}</div>
      <div className="text-secondary ml-auto"> {created}</div>
    </div>
  );
}

export default InfoBar;
