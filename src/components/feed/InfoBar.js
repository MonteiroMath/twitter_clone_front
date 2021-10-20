import React from "react";

function InfoBar(props) {
  const { username, created } = props;

  let createdDate = new Date(created);

  return (
    <div className="d-flex">
      <div className="font-weight-bold">{username}</div>
      <div className="text-secondary pl-2"> @{username}</div>
      <div className="text-secondary ml-auto">
        {" "}
        {createdDate.toDateString().match(/\w{3}\s\d{2}/)[0]}
      </div>
    </div>
  );
}

export default InfoBar;
