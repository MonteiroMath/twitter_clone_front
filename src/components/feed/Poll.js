import React from "react";

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
  console.log("tl: " + timelapse[0]);
  console.log("ml: " + maxLen[0]);

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

//todo improve display
function Poll({ poll, pollSettings, start }) {
  const { choices, votes, pollLen } = pollSettings;

  if (poll) {
    var totalVotes = poll ? votes[0] + votes[1] : 0;
    totalVotes = totalVotes === 0 ? 1 : totalVotes;

    var timeleft = GetTimeLeft(start, pollLen);
  }

  return poll ? (
    <div>
      <div>
        {choices[0]} - {((votes[0] / totalVotes) * 100).toFixed(2)} %
      </div>
      <div>
        {choices[1]} - {((votes[1] / totalVotes) * 100).toFixed(2)} %
      </div>
      <div>
        {totalVotes} votes - {timeleft}
      </div>
    </div>
  ) : null;
}

export default Poll;
