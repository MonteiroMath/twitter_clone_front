import { useDispatch } from "react-redux";

import { postTweet } from "../../../../store/tweetsSlice";

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
      postTweet({
        userId: 1,
        newTweet,
      })
    );

    toggle(); //!verify if it is ok to toggle separated from clearPoll
    //history.push("/"); //!verify redirect in this situation
  }

  return <NewTweetFormControl quote={quote} handleSubmit={handleSubmit} />;
}

export default CommentTweetForm;
