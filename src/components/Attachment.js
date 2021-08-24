import React from "react";

function Attachment(props) {
  let { url, alt, handleRemove, preview } = props;

  let output = url ? (
    <div>
      {preview ? (
        <button className="cremoveAttach" onClick={handleRemove}>
          X
        </button>
      ) : null}
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
