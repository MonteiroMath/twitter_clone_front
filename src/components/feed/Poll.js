import React from "react";

//todo improve display
function Poll({ poll, pollSettings }) {
  const { choices, votes, ends } = pollSettings;

  let totalVotes = poll ? votes[0] + votes[1] : 0;

  return poll ? (
    <div>
      <div>
        {choices[0]} - {(votes[0] / totalVotes) * 100}%
      </div>
      <div>
        {choices[1]} - {(votes[1] / totalVotes) * 100}%
      </div>
      <div>{totalVotes} votes</div>
    </div>
  ) : null;
}

export default Poll;
