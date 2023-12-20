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
    page: mockInitialSlice(),
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
  };

  return {
    ...mockedTweet,
    ...customValues,
  };
}

const mocker = {
  mockInitialState,
  mockInitialSlice,
  mockTweet,
};

export default mocker;
