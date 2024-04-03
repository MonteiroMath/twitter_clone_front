import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken } from "../../../../store/UserSlice";

import { postAnswer } from "../../../../store/tweetsSlice";

import NewTweetFormControl from "../NewTweetFormControl/NewTweetFormControl";

function AnswerTweetForm({ toggle, parent_id }) {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));

  function handleSubmit(formData) {
    const { tweetText, attach, poll, pollChoices, pollLength } = formData;

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
      postAnswer({
        userId: 1,
        newTweet,
        parentId: parent_id,
        jwtToken,
      })
    );

    toggle && toggle();

    //!confirm if no redirect here
    //history.push("/");
  }

  return (
    <NewTweetFormControl
      handleSubmit={handleSubmit}
      placeholder="Answer tweet"
      submit_text="Comment"
    />
  );
}

export default AnswerTweetForm;
