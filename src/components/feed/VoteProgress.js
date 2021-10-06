// Extract vote progress bars
import React from "react";
import { Progress } from "reactstrap";

function evaluteVotePercentage(votes, totalVotes) {
  if (totalVotes === 0) {
    return 0;
  }

  return ((votes / totalVotes) * 100).toFixed(2);
}

function VoteProgress({ choice, totalVotes }) {
  const { text, votes } = choice;
  const votePer = evaluteVotePercentage(votes, totalVotes);

  return (
    <Progress
      style={{ height: 30 }}
      barStyle={{ overflow: "visible" }}
      className="mb-3"
      animated
      color="info"
      value={votePer}
    >
      <div className="cAbsolute w-100 p-2 cBold text-dark d-flex justify-content-between">
        <span>{text}</span>
        <span>{votePer} %</span>
      </div>
    </Progress>
  );
}

export default VoteProgress;
