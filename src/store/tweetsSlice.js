import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { postAnswer } from "./PageSlice";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchTweets = createAsyncThunk("tweets/fetch", async (id) => {
  const data = await client.get(`/tweets?userId=${id}`);

  return data;
});

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
    const data = await client.post(`/tweets/${parentId}/comments`, {
      newTweet,
    });

    return data;
  }
);

export const addLike = createAsyncThunk("tweets/addLike", async (params) => {
  const { id, userId } = params;
  const data = await client.put(`/tweets/${id}/likes?userId=${userId}`);

  return data.like;
});

export const deleteLike = createAsyncThunk(
  "tweets/deleteLike",
  async (params) => {
    const { id, userId } = params;
    const data = await client.delete(`/tweets/${id}/likes?userId=${userId}`);

    return data.success;
  }
);

function isActionRejected(action) {
  return action.type.endsWith("/rejected");
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
        state.status = "fulfilled";
        if (action.payload.success) {
          state.data = action.payload.tweets;
        }
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        const { tweet } = action.payload;
        state.data.unshift(tweet);
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        const { tweet } = action.payload;
        state.data.unshift(tweet);
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        let { tweet } = action.payload;

        state.data.unshift(tweet);
      })
      .addCase(removeRetweet.fulfilled, (state, action) => {
        const { tweetId } = action.payload;

        let retweetIndex = state.data.findIndex(
          (tweet) =>
            (tweet.id === tweetId && tweet.original !== null) ||
            tweet.original === tweetId
        );

        state.data.splice(retweetIndex, 1);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { comment } = action.payload;

        state.data.push(comment);
      })
      .addCase(addLike.fulfilled, (state, action) => {
        let like = action.payload;

        //todo figure out how I want to update tweets now. Maybe receive the updated tweet and change it in the store?
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
  state.tweets.data.find((tweet) => tweet.id === id);
export const selectAllTweets = (state) => state.tweets.data;
export const selectSomeTweets = (state, listOfIds) =>
  listOfIds.map((id) => state.tweets.data.find((tweet) => tweet.id === id));
