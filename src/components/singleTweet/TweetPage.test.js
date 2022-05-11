import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../renderWithRedux";

const mockedTweet = {
  id: 1,
  author: 1,
  created_at: new Date().getTime(),
  message: "This is my second tweet lol getting good at this",
  likes: 3,
  retweets: 0,
  liked_by: [],
  retweeted_by: [],
  comment_ids: [],
  comments: 0,
  attach: "",
  poll: false,
  pollSettings: {},
  retweet: null,
};

const initialState = {
  tweets: {
    status: "fullfiled",
    error: null,
    tweets: [mockedTweet],
  },
};

jest.mock("../../api/client");

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", async () => {
    const history = createMemoryHistory();
    history.push("/1");

    const typedText = "git gud";
    const comment = {
      id: 1400,
      author: 1,
      created_at: 1650983974062,
      message: typedText,
      attach: "",
      poll: false,
      retweet: null,
      retweeted_by: [],
      liked_by: [],
      comment_ids: [],
      pollSettings: {
        choices: [
          { text: "", votes: 0 },
          { text: "", votes: 0 },
        ],
        pollLen: { days: 0, hours: 0, minutes: 0 },
        votes: [0, 0],
      },
    };

    //mock api response to post comment
    const resp = {
      success: true,
      updatedTweet: { ...mockedTweet, comment_ids: [comment.id] },
      comment,
    };
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
