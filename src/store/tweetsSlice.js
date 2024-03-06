import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { postAnswer } from "./PageSlice";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

function updateTweet(stateData, updatedTweet) {
  let index = stateData.findIndex((tweet) => tweet.id === updatedTweet.id);

  if (index !== -1) {
    stateData[index] = updatedTweet;
  }
}

export const fetchTweets = createAsyncThunk("tweets/fetch", async (id) => {
  const data = await client.get(`/tweets?userId=${id}`);
  return data;
});

export const fetchReference = createAsyncThunk(
  "tweets/fetchReference",
  async ({ tweetId, userId }) => {
    const data = await client.get(
      `/tweets/${tweetId}/reference?userId=${userId}`
    );

    return data;
  }
);

export const postTweet = createAsyncThunk(
  "tweets/postTweets",
  async ({ userId, newTweet }) => {
    const result = await client.post("/tweets", {
      userId,
      newTweet,
    });

    console.log(result);

    const { tweet } = result;
    return { tweet };
  }
);

export const addRetweet = createAsyncThunk(
  "tweets/addRt",
  async ({ tweetId, userId }) => {
    const data = await client.post(
      `/tweets/${tweetId}/retweet?userId=${userId}`
    );
    return data;
  }
);

export const removeRetweet = createAsyncThunk(
  "tweets/deleteRt",
  async ({ tweetId, userId }) => {
    const data = await client.delete(
      `/tweets/${tweetId}/retweet?userId=${userId}`
    );
    return data;
  }
);

export const addComment = createAsyncThunk(
  "tweets/addComment",
  async ({ newTweet, referenceId, userId }) => {
    const data = await client.post(
      `/tweets/${referenceId}/comments?userId=${userId}`,
      {
        newTweet,
      }
    );

    return data;
  }
);

export const addLike = createAsyncThunk(
  "tweets/addLike",
  async ({ id, userId }) => {
    const data = await client.post(`/tweets/${id}/likes?userId=${userId}`);

    return data;
  }
);

export const deleteLike = createAsyncThunk(
  "tweets/deleteLike",
  async ({ id, userId }) => {
    const data = await client.delete(`/tweets/${id}/likes?userId=${userId}`);

    return data;
  }
);

export const addLikeRt = createAsyncThunk(
  "tweets/addLikeRt",
  async ({ tweetId, userId }) => {
    const data = await client.post(
      `/tweets/${tweetId}/likes/rt?userId=${userId}`
    );

    return data;
  }
);

export const deleteLikeRt = createAsyncThunk(
  "tweets/deleteLikeRt",
  async ({ tweetId, userId }) => {
    const data = await client.delete(
      `/tweets/${tweetId}/likes/rt?userId=${userId}`
    );

    return data;
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
      .addCase(fetchReference.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { tweet } = action.payload;

          updateTweet(state.data, tweet);
        }
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        const { tweet } = action.payload;
        state.data.unshift(tweet);
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        const { tweet, updatedTweet } = action.payload;
        updateTweet(state.data, updatedTweet);
        state.data.unshift(tweet);
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        let { tweet, updatedTweet } = action.payload;

        updateTweet(state.data, updatedTweet);
        state.data.unshift(tweet);
      })
      .addCase(removeRetweet.fulfilled, (state, action) => {
        const { updatedTweet } = action.payload;

        updateTweet(state.data, updatedTweet);

        //todo extract
        let retweetIndex = state.data.findIndex(
          (tweet) =>
            tweet.referenceId === updatedTweet.id && tweet.type === "retweet"
        );

        state.data.splice(retweetIndex, 1);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { tweet, updatedTweet } = action.payload;

        updateTweet(state.data, updatedTweet);
        state.data.unshift(tweet);
      })
      .addCase(addLike.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { updatedTweet } = action.payload;
          updateTweet(state.data, updatedTweet);
        } else {
          console.log(action.payload.msg);
        }
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        const { updatedTweet } = action.payload;
        updateTweet(state.data, updatedTweet);
      })
      .addCase(addLikeRt.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { updatedTweet, updatedReference } = action.payload;

          updateTweet(state.data, updatedTweet);
          updateTweet(state.data, updatedReference);
        } else {
          console.log(action.payload.msg);
        }
      })
      .addCase(deleteLikeRt.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { updatedTweet, updatedReference } = action.payload;
          updateTweet(state.data, updatedTweet);
          updateTweet(state.data, updatedReference);
        } else {
          console.log(action.payload.msg);
        }
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
