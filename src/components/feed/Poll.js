import React from "react";
import { Progress } from "reactstrap";

function GetTimeLeft(start, maxLen) {
  const { days, hours, minutes } = maxLen;

  start = new Date(start);

  const today = new Date();

  const timeLapse = [
    today.getDay() - start.getDay(),
    today.getHours() - start.getHours(),
    today.getMinutes() - start.getMinutes(),
  ];

  return evaluateTimeLapse(
    timeLapse,
    [days, hours, minutes],
    ["days", "hours", "minutes"]
  );
}

function evaluateTimeLapse(timelapse, maxLen, units) {
  if (timelapse[0] > maxLen[0]) {
    return "Final Results";
  } else if (maxLen[0] > timelapse[0]) {
    return `${maxLen[0] - timelapse[0]} ${units[0]} left`;
  } else if (timelapse.length > 1) {
    return evaluateTimeLapse(
      timelapse.slice(1),
      maxLen.slice(1),
      units.slice(1)
    );
  } else {
    return "Final Results";
  }
}

function evaluteVotePercentage(votes, totalVotes) {
  if (totalVotes === 0) {
    return 0;
  }

  return ((votes / totalVotes) * 100).toFixed(2);
}

//todo Extract Progress bars into another component (will be better when more poll options are implemented)
function Poll({ poll, pollSettings, start }) {
  const { choices, votes, pollLen } = pollSettings;

  if (poll) {
    var totalVotes = votes[0] + votes[1];
    var timeleft = GetTimeLeft(start, pollLen);
  }

  return poll ? (
    <div>
      <Progress
        style={{ height: 30 }}
        barStyle={{ overflow: "visible" }}
        className="mb-3"
        animated
        color="info"
        value={evaluteVotePercentage(votes[0], totalVotes)}
      >
        <div className="cAbsolute w-100 p-2 cBold text-dark d-flex justify-content-between">
          <span>{choices[0]}</span>
          <span>{evaluteVotePercentage(votes[0], totalVotes)} %</span>
        </div>
      </Progress>

      <Progress
        style={{ height: 30 }}
        barStyle={{ overflow: "visible" }}
        className="mb-3"
        animated
        color="info"
        value={evaluteVotePercentage(votes[1], totalVotes)}
      >
        <span className="cAbsolute w-100 p-2 cBold text-dark d-flex justify-content-between">
          <span>{choices[1]}</span>
          <span>{evaluteVotePercentage(votes[1], totalVotes)} %</span>
        </span>
      </Progress>

      <div>
        {totalVotes} votes - {timeleft}
      </div>
    </div>
  ) : null;
}

export default Poll;
