import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../renderWithRedux";

const mockedTweet = {
  id: 1,
  author: 1,
  retweet: 0,
  content: 1000,
  parent: null,
};

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

const initialState = {
  tweets: {
    status: "fulfilled",
    error: null,
    data: [mockedTweet],
  },
  tweetContent: {
    status: "fulfilled",
    error: null,
    data: [mockedTweetContent],
  },
  page: {
    status: "fulfilled",
    error: null,
    data: [],
  },
};

jest.mock("../../api/client");

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", async () => {
    const history = createMemoryHistory();
    history.push("/1");

    const typedText = "git gud";

    const resp = {
      success: true,
      updatedTweet: {
        tweet: mockedTweet,
        tweetContent: { ...mockedTweetContent, comment_ids: [1005] },
      },
      tweet: {
        id: 1999,
        author: 1,
        retweet: 0,
        content: 99999,
        parent: mockedTweet.id,
        original: null,
      },
      tweetContent: {
        id: 99999,
        author: 1,
        message: typedText,
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
      },
    };

    //mock api response to post comment

    client.post.mockResolvedValue(resp);

    renderWithHistory(<TweetPage />, history, "/:id", {
      initialState,
    });

    expect(
      screen.getByText(/This is my second tweet lol getting good at this/i)
    ).toBeInTheDocument();

    let button = screen.getByRole("button", { name: /^comment$/i });
    expect(button).toBeDisabled();

    let commentBox = screen.getByPlaceholderText(/Answer this tweet/);

    //type new comment
    userEvent.type(commentBox, typedText);

    expect(commentBox.value).toBe(typedText);
    expect(button).not.toBeDisabled();

    //click sent comment button
    userEvent.click(button);
    //check if new comment was sent
    expect(await screen.findByText(typedText)).toBeInTheDocument();
    expect(commentBox.value).toBe("");
  });
});
