import { createSlice } from "@reduxjs/toolkit";
import tweetData from "../placeholders/tweets";

const initialState = tweetData;

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    postTweet(state, action) {
      let { newTweet } = action.payload;
      let tt_count = state.length;
      let tweet = createNewTweet(tt_count + 1, newTweet);
      state.push(tweet);
    },
    like(state, action) {
      let { id, userId } = action.payload;
      let likedTweet = state.find((tweet) => tweet.id === id);

      likedTweet.likes += 1;
      likedTweet.liked_by.push(userId);
    },
    unlike(state, action) {
      let { id, userId } = action.payload;
      let likedTweet = state.find((tweet) => tweet.id === id);

      likedTweet.likes -= 1;
      likedTweet.liked_by = likedTweet.liked_by.filter((id) => id !== userId);
    },
    retweet(state, action) {
      let { tweetId, userId } = action.payload;
      let rtTweet = state.find((tweet) => tweet.id === tweetId);

      let retweet = {
        id: 1001,
        author: 1,
        created: new Date().getTime(),
        tweetId,
      };

      rtTweet.retweets += 1;
      rtTweet.retweeted_by.push(userId);
      state.push(retweet);
    },
    undoRetweet(state, action) {
      let { tweetId, userId } = action.payload;
      let rtTweet = state.find((tweet) => tweet.id === tweetId);
      let retweetIndex = state.findIndex((tweet) => tweet.tweetId === tweetId);

      rtTweet.retweets -= 1;
      rtTweet.retweeted_by = rtTweet.retweeted_by.filter((id) => id !== userId);
      state.splice(retweetIndex, 1);
    },
    commentTweet(state, action) {
      let { parent_id, newTweet } = action.payload;
      let commentedTweet = state.find((tweet) => tweet.id === parent_id);

      let tt_count = state.length;
      let comment = createNewTweet(tt_count + 1, newTweet);

      commentedTweet.comments += 1;
      commentedTweet.comment_ids.push(comment.id);
      console.log(commentedTweet.comment_ids);
      state.push(comment);
    },
  },
});

function createNewTweet(id, content) {
  let now = new Date().getTime();

  return {
    id,
    author: 1,
    created: now,
    message: content.message,
    attach: content.attach,
    poll: content.poll,
    retweet: content.retweet,
    retweeted_by: [],
    liked_by: [],
    pollSettings: {
      choices: content.pollSettings.choices,
      pollLen: content.pollSettings.pollLen,
      votes: [0, 0],
    },
    likes: 0,
    retweets: 0,
    comments: 0,
    comment_ids: [],
  };
}

export const actions = tweetsSlice.actions;
export default tweetsSlice.reducer;
