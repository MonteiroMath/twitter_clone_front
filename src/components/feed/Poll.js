import React from "react";
import { Progress } from "reactstrap";

import VoteProgress from "./VoteProgress";

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

function Poll({ poll, pollSettings, start }) {
  const { choices, pollLen } = pollSettings;

  if (poll) {
    var totalVotes = choices[0].votes + choices[1].votes;
    var timeleft = GetTimeLeft(start, pollLen);
    var progressBars = choices.map((choice, i) => (
      <VoteProgress key={i} choice={choice} totalVotes={totalVotes} />
    ));
  }

  return poll ? (
    <div>
      {progressBars}
      <div>
        {totalVotes} votes - {timeleft}
      </div>
    </div>
  ) : null;
}

export default Poll;
