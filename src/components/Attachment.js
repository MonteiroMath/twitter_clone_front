import React from "react";

function Attachment(props) {
  let { url, alt } = props;

  let output = url ? (
    <div>
      <img
        className="ctweetAttach"
        alt={alt ? alt : "user attachment"}
        src={url}
      />
    </div>
  ) : null;

  return output;
}

export default Attachment;
