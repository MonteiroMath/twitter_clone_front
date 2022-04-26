import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../renderWithRedux";

const tweetsInitialState = {
  status: "fullfiled",
  error: null,
  tweets: [
    {
      id: 1,
      author: 1,
      created: new Date().getTime(),
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
    },
  ],
};

jest.mock("../../api/client");

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", async () => {
    const history = createMemoryHistory();
    history.push("/1");

    const typedText = "git gud";
    const updatedTweet = { ...tweetsInitialState.tweets[0], comment_ids: [] };
    updatedTweet.comment_ids.push(1400);
    const comment = {
      id: 1400,
      author: 1,
      created: 1650983974062,
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

    const resp = {
      success: true,
      updatedTweet,
      comment,
    };

    client.post.mockResolvedValue(resp);

    renderWithHistory(<TweetPage />, history, "/:id", {
      initialState: { tweets: tweetsInitialState },
    });

    expect(
      screen.getByText(/This is my second tweet lol getting good at this/i)
    ).toBeInTheDocument();

    let button = screen.getByRole("button", { name: /^comment$/i });
    expect(button).toBeDisabled();

    let commentBox = screen.getByPlaceholderText(/Answer this tweet/);

    userEvent.type(commentBox, typedText);

    expect(commentBox.value).toBe(typedText);
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(await screen.findByText(typedText)).toBeInTheDocument();
    expect(commentBox.value).toBe("");
  });
});
