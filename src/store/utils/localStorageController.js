const KEY = "userState";

export const loadUserState = () => {
  try {
    const state = localStorage.getItem(KEY);

    if (!state) {
      return undefined;
    }

    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

export const saveUserState = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(KEY, serializedState);
  } catch (err) {
    console.log(err);
    console.log("Could not serialize state");
  }
};

export const clearUserState = () => {
  try {
    localStorage.removeItem(KEY);
  } catch (err) {
    console.log("Could not clear user data from local storage");
  }
};
