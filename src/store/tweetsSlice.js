import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
  status: "idle",
  error: null,
  tweets: [],
  tweetContent: [],
};

export const fetchTweets = createAsyncThunk(
  "tweets/fetchTweets",
  async (id) => {
    const data = await client.get(`/tweets/user/${id}`);
    return data;
  }
);

export const postTweet = createAsyncThunk(
  "tweets/postTweets",
  async (params) => {
    const { userId, newTweet } = params;
    const { tweet, tweetContent } = await client.post("/tweets", {
      userId,
      newTweet,
    });

    return { tweet, tweetContent };
  }
);

export const updateLike = createAsyncThunk(
  "tweets/updateLike",
  async (params) => {
    const { id, userId, like } = params;
    const data = await client.put(`/tweets/${id}/likes`, { userId, like });

    return data.updatedTweet;
  }
);

export const addRetweet = createAsyncThunk("tweets/addRt", async (params) => {
  const { tweetId, userId } = params;
  const data = await client.post(`/tweets/${tweetId}/retweet`, { userId });
  return data;
});

export const removeRetweet = createAsyncThunk(
  "tweets/deleteRt",
  async (params) => {
    const { tweetId, userId } = params;
    const data = await client.delete(`/tweets/${tweetId}/retweet`, { userId });
    return { tweetId, updatedTweet: data.updatedTweet };
  }
);

export const addComment = createAsyncThunk(
  "tweets/addComment",
  async (params) => {
    const { newTweet, parentId } = params;
    const data = await client.post(`/tweets/${parentId}/comment`, { newTweet });

    return data;
  }
);

function isActionRejected(action) {
  return action.type.endsWith("/rejected");
}

function updateTweet(state, updatedTweet) {
  let index = state.tweetContent.findIndex(
    (tweet) => tweet.id === updatedTweet.id
  );

  state.tweetContent[index] = updatedTweet;
}

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTweets.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = "fullfiled";
        state.tweets = action.payload.tweets;
        state.tweetContent = action.payload.tweetContent;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        const { tweet, tweetContent } = action.payload;
        state.tweets.unshift(tweet);
        state.tweetContent.push(tweetContent);
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        let updatedTweet = action.payload;

        updateTweet(state, updatedTweet);
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        let { tweet, tweetContent } = action.payload;

        updateTweet(state, tweetContent);
        state.tweets.unshift(tweet);
      })
      .addCase(removeRetweet.fulfilled, (state, action) => {
        const { tweetId, updatedTweet } = action.payload;

        let retweetIndex = state.tweets.findIndex(
          (tweet) => tweet.id === tweetId
        );
        
        state.tweets.splice(retweetIndex, 1);
        updateTweet(state, updatedTweet);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { updatedTweet, comment } = action.payload;

        updateTweet(state, updatedTweet);
        state.tweets.push(comment);
      })
      .addMatcher(isActionRejected, (state, action) => {
        console.log(action.error.message);
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
export const selectTweetContent = (state, contentId) =>
  state.tweets.tweetContent.find(
    (tweetContent) => tweetContent.id === contentId
  );
export const selectAllTweets = (state) => state.tweets.tweets;
export const selectSomeTweets = (state, listOfIds) =>
  listOfIds.map((id) => state.tweets.tweets.find((tweet) => tweet.id === id));
