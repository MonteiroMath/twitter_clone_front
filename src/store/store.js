import { configureStore } from "@reduxjs/toolkit";
import tweetsSlice from "./tweetsSlice";
import PageSlice from "./PageSlice";
import UserSlice from "./UserSlice";

import { saveUserState } from "./utils/localStorageController";

const store = configureStore({
  reducer: {
    tweets: tweetsSlice,
    page: PageSlice,
    user: UserSlice,
  },
});

store.subscribe(() => {
  saveUserState({
    ...store.getState().user.data,
  });
});

export default store;
