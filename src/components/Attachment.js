import React from "react";

function Attachment(props) {
  let { url } = props;

  let output = url ? (
    <div>
      <img className="ctweetAttach" alt="user attachment" src={url} />
    </div>
  ) : null;

  return output;
}

export default Attachment;
