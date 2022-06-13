import { configureStore } from "@reduxjs/toolkit";
import tweetsSlice from "./tweetsSlice";
import tweetContentSlice from "./tweetContentSlice";
import PageSlice from "./PageSlice";

export default configureStore({
  reducer: {
    tweets: tweetsSlice,
    tweetContent: tweetContentSlice,
    page: PageSlice,
  },
});
