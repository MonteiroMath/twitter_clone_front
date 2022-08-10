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
    tweetContent: mockInitialSlice(),
    page: mockInitialSlice(),
  };

  return { ...initialState, ...customValues };
}

function mockTweet(customValues = {}) {
  const mockedTweet = {
    id: 1,
    author: 1,
    retweet: 0,
    content: 1000,
    parent: null,
    original: null,
  };

  return {
    ...mockedTweet,
    ...customValues,
  };
}

function mockTweetContent(customValues = {}) {
  const mockedTweetContent = {
    id: 1000,
    author: 1,
    message: "This is my second tweet lol getting good at this",
    attach: null,
    created_at: new Date().getTime(),
    poll: 0,
    comment: null,
    liked_by: [],
    retweeted_by: [],
    comment_ids: [],
    pollSettings: {
      choices: ["hi", "ho"],
      pollLen: {
        days: 1,
        hours: 3,
        minutes: 35,
      },
    },
  };

  return { ...mockedTweetContent, ...customValues };
}

const mocker = {
  mockInitialState,
  mockInitialSlice,
  mockTweet,
  mockTweetContent,
};

export default mocker;
