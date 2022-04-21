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

export const postTweet = createAsyncThunk(
  "tweets/postTweets",
  async (params) => {
    const { newTweet } = params;
    const response = await fetch("http://localhost:5000/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ newTweet }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.tweet;
    }
  }
);

export const updateLike = createAsyncThunk(
  "tweets/updateLike",
  async (params) => {
    let { id, userId, like } = params;

    const response = await fetch(`http://localhost:5000/tweets/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ userId, like }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.tweet;
    }
  }
);

export const addRetweet = createAsyncThunk("tweets/addRt", async (params) => {
  const { tweetId, userId } = params;

  const response = await fetch(
    `http://localhost:5000/tweets/${tweetId}/retweet`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ userId }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }
});

export const removeRetweet = createAsyncThunk(
  "tweets/deleteRt",
  async (params) => {
    const { tweetId, userId } = params;

    const response = await fetch(
      `http://localhost:5000/tweets/${tweetId}/retweet`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ userId }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.updatedTweet;
    }
  }
);

export const addComment = createAsyncThunk(
  "tweets/addComment",
  async (params) => {
    const { newTweet, parent_id } = params;

    const response = await fetch(
      `http://localhost:5000/tweets/${parent_id}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ newTweet }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.newTweet;
    }
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    /*commentTweet(state, action) {
      let { parent_id, newTweet } = action.payload;
      let commentedTweet = state.tweets.find((tweet) => tweet.id === parent_id);

      let tt_count = state.tweets.length;
      let comment = createNewTweet(tt_count + 1, newTweet);

      commentedTweet.comments += 1;
      commentedTweet.comment_ids.push(comment.id);
      console.log(commentedTweet.comment_ids);
      state.tweets.push(comment);
    },*/
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
        state.error = action.error.message;
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        let tweet = action.payload;
        state.tweets.push(tweet);
      })
      .addCase(postTweet.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        let updatedTweet = action.payload;
        let index = state.tweets.findIndex(
          (tweet) => tweet.id === updatedTweet.id
        );

        state.tweets[index] = updatedTweet;
      })
      .addCase(updateLike.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        let { updatedTweet, retweet } = action.payload;

        let index = state.tweets.findIndex(
          (tweet) => tweet.id === updatedTweet.id
        );
        state.tweets[index] = updatedTweet;

        state.tweets.push(retweet);
      })
      .addCase(addRetweet.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(removeRetweet.fulfilled, (state, action) => {
        const updatedTweet = action.payload;

        let index = state.tweets.findIndex(
          (tweet) => tweet.id === updatedTweet.id
        );

        let retweetIndex = state.tweets.findIndex(
          (tweet) => tweet.tweetId === updatedTweet.id
        );

        state.tweets[index] = updatedTweet;
        state.tweets.splice(retweetIndex, 1);
      });
  },
});

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
