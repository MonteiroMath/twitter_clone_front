import { useDispatch } from "react-redux";

import { postAnswer } from "../../../../store/PageSlice";

import NewTweetFormControl from "../NewTweetFormControl/NewTweetFormControl";

function AnswerTweetForm({ toggle, quote, parent_id }) {
  const dispatch = useDispatch();
  //let history = useHistory();

  function handleSubmit(formData) {
    const { tweetText, attach, poll, pollChoices, pollLength } = formData;

    let choices = pollChoices.map((choice) => {
      return { text: choice, votes: 0 };
    });

    let newTweet = {
      message: tweetText,
      attach: attach,
      poll: poll,
      comment: quote.id,
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
      })
    );

    toggle();

    //!confirm if no redirect here
    //history.push("/");
  }

  return (
    <NewTweetFormControl
      handleSubmit={handleSubmit}
      quote={quote}
      placeholder="Answer tweet"
    />
  );
}

export default AnswerTweetForm;
