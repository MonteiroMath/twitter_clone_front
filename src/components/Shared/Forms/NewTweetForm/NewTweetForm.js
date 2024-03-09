import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken } from "../../../../store/UserSlice";

import { postTweet } from "../../../../store/tweetsSlice";

import NewTweetFormControl from "../NewTweetFormControl/NewTweetFormControl";

function NewTweetForm({ toggle }) {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));
  let history = useHistory();

  function handleSubmit(formData) {
    const { tweetText, attach, poll, pollChoices, pollLength } = formData;

    //!move this to formControl
    let choices = pollChoices.map((choice) => {
      return { text: choice, votes: 0 };
    });

    let newTweet = {
      message: tweetText,
      attach: attach,
      poll: poll,
      comment: null,
      pollSettings: {
        choices,
        pollLen: pollLength,
      },
    };

    dispatch(
      postTweet({
        userId: 1,
        newTweet,
        jwtToken,
      })
    );

    toggle && toggle(); //!verify if it is ok to toggle separated from clearPoll
    history.push("/home"); //!verify redirect in this situation
  }

  return (
    <NewTweetFormControl
      handleSubmit={handleSubmit}
      placeholder="What's happening?"
    />
  );
}

export default NewTweetForm;
