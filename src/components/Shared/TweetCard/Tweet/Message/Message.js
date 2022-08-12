import React from "react";

function Message(props) {
  const { message } = props;

  return (
    <div className="ctweetMessage">
      <p>{message}</p>
    </div>
  );
}

export default Message;
