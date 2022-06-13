import { configureStore } from "@reduxjs/toolkit";
import tweetsSlice from "./tweetsSlice";
import tweetContentSlice from "./tweetContentSlice";

export default configureStore({
  reducer: {
    tweets: tweetsSlice,
    tweetContent: tweetContentSlice,
  },
});
