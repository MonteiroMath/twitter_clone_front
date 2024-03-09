import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken } from "../../../../store/UserSlice";
import { addComment } from "../../../../store/tweetsSlice";

import NewTweetFormControl from "../NewTweetFormControl/NewTweetFormControl";

function CommentTweetForm({ toggle, quote }) {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));

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
        jwtToken,
      })
    );

    toggle && toggle(); //!verify if it is ok to toggle separated from clearPoll
    //history.push("/"); //!verify redirect in this situation
  }

  return <NewTweetFormControl quote={quote} handleSubmit={handleSubmit} />;
}

export default CommentTweetForm;
