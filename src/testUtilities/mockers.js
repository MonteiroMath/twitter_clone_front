function mockInitialSlice(customValues = {}) {
  const initialState = {
    status: "fulfilled",
    error: null,
    data: [],
  };

  return { ...initialState, ...customValues };
}

function mockInitialState(customValues = {}) {
  const initialState = {
    tweets: mockInitialSlice(),
    user: mockInitialSlice(),
  };

  return { ...initialState, ...customValues };
}

function mockTweet(customValues = {}) {
  const mockedTweet = {
    id: 1,
    message: "Test",
    attachment: null,
    pool: false,
    type: "simple",
    createdAt: "2023-12-20T14:52:13.000Z",
    updatedAt: "2023-12-20T14:52:13.000Z",
    referenceId: null,
    authorId: 1,
    retweetsCount: 0,
    commentsCount: 0,
    answersCount: 0,
    likesCount: 0,
    liked: 0,
    retweeted: 0,
    reference: null,
    author: {
      id: 1,
      username: "notmenotme",
      avatar: null,
    },
  };

  return {
    ...mockedTweet,
    ...customValues,
  };
}

function mockUser(customValues = {}) {
  const mockedUser = {
    id: 1,
    username: "TestUser",
    email: "testuser@test.com",
    description: "",
    webpage: "",
    birthDate: "1992-01-01T00:00:00.000Z",
    updatedAt: "2024-03-15T13:16:21.473Z",
    createdAt: "2024-03-15T13:16:21.473Z",
    followedCount: 0,
    followersCount: 0,
    isFollowed: false,
  };

  return {
    ...mockedUser,
    ...customValues,
  };
}

const mocker = {
  mockInitialState,
  mockInitialSlice,
  mockTweet,
  mockUser,
};

export default mocker;
