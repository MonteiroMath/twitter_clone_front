const key = "userState";

export const loadUserState = () => {
  try {
    const state = localStorage.getItem(key);

    if (state) {
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

    localStorage.set(key, serializedState);
  } catch (err) {
    console.log("Could not serialize state");
  }
};

export const clearUserState = () => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log("Could not clear user data from local storage");
  }
};
