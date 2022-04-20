import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  tweets: [],
};

export const fetchTweets = createAsyncThunk(
  "tweets/fetchTweets",
  async (id) => {
    const response = await fetch(`http://localhost:5000/tweets/user/${id}`);

    if (response.ok) {
      const data = await response.json();
      return data.tweets;
    }
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    postTweet(state, action) {
      let { newTweet } = action.payload;
      let tt_count = state.tweets.length;
      let tweet = createNewTweet(tt_count + 1, newTweet);
      state.tweets.push(tweet);
    },
    like(state, action) {
      let { id, userId } = action.payload;
      let likedTweet = state.tweets.find((tweet) => tweet.id === id);

      likedTweet.likes += 1;
      likedTweet.liked_by.push(userId);
    },
    unlike(state, action) {
      let { id, userId } = action.payload;
      let likedTweet = state.tweets.find((tweet) => tweet.id === id);

      likedTweet.likes -= 1;
      likedTweet.liked_by = likedTweet.liked_by.filter((id) => id !== userId);
    },
    retweet(state, action) {
      let { tweetId, userId } = action.payload;
      let rtTweet = state.tweets.find((tweet) => tweet.id === tweetId);

      let retweet = {
        id: 1001,
        author: 1,
        created: new Date().getTime(),
        tweetId,
      };

      rtTweet.retweets += 1;
      rtTweet.retweeted_by.push(userId);
      state.tweets.push(retweet);
    },
    undoRetweet(state, action) {
      let { tweetId, userId } = action.payload;
      let rtTweet = state.tweets.find((tweet) => tweet.id === tweetId);
      let retweetIndex = state.tweets.findIndex((tweet) => tweet.tweetId === tweetId);

      rtTweet.retweets -= 1;
      rtTweet.retweeted_by = rtTweet.retweeted_by.filter((id) => id !== userId);
      state.tweets.splice(retweetIndex, 1);
    },
    commentTweet(state, action) {
      let { parent_id, newTweet } = action.payload;
      let commentedTweet = state.tweets.find((tweet) => tweet.id === parent_id);

      let tt_count = state.tweets.length;
      let comment = createNewTweet(tt_count + 1, newTweet);

      commentedTweet.comments += 1;
      commentedTweet.comment_ids.push(comment.id);
      console.log(commentedTweet.comment_ids);
      state.tweets.push(comment);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTweets.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = "fullfiled";
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action);
        state.error = action.error.message;
      });
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

//reducer
export default tweetsSlice.reducer;

//actions
export const actions = tweetsSlice.actions;

//selectors
export const selectTweetById = (state, id) =>
  state.tweets.tweets.find((tweet) => tweet.id === id);
export const selectAllTweets = (state) => state.tweets.tweets;
export const selectSomeTweets = (state, listOfIds) =>
  listOfIds.map((id) => state.tweets.tweets.find((tweet) => tweet.id === id));
