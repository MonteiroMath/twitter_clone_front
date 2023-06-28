import { useDispatch } from "react-redux";

import { addComment } from "../../../../store/tweetsSlice";

import NewTweetFormControl from "../NewTweetFormControl/NewTweetFormControl";

function CommentTweetForm({ toggle, quote }) {
  const dispatch = useDispatch();
  //let history = useHistory();

  function handleSubmit(formData) {
    const { tweetText, attach } = formData;

    let newTweet = {
      message: tweetText,
      attach: attach,
      comment: null,
    };

    dispatch(
      addComment({
        userId: 1,
        referenceId: quote.id,
        newTweet,
      })
    );

    toggle && toggle(); //!verify if it is ok to toggle separated from clearPoll
    //history.push("/"); //!verify redirect in this situation
  }

  return <NewTweetFormControl quote={quote} handleSubmit={handleSubmit} />;
}

export default CommentTweetForm;
