import { configureStore } from "@reduxjs/toolkit";
import tweetsSlice from "./tweetsSlice";

export default configureStore({
  reducer: {
    tweets: tweetsSlice,
  },
});

