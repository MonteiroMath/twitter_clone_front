import { configureStore } from "@reduxjs/toolkit";
import tweetsSlice from "./tweetsSlice";
import PageSlice from "./PageSlice";

export default configureStore({
  reducer: {
    tweets: tweetsSlice,
    page: PageSlice,
  },
});
