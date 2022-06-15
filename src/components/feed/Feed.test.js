import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../renderWithRedux";
import { client } from "../../api/client";
import Feed from "./Feed.js";

const initialState = {
  tweets: {
    status: "fulfilled",
    error: null,
    data: [],
  },
  tweetContent: {
    status: "fulfilled",
    error: null,
    data: [],
  },
};

afterEach(cleanup);
jest.mock("../../api/client");

describe("Add new tweet", () => {
  test("Add a tweet to the top of the feed", async () => {
    const typedText = "Typed by the user";
    const resp = {
      success: true,
      tweet: {
        id: 1111,
        author: 1,
        retweet: 0,
        content: 1000,
        parent: null,
      },
      tweetContent: {
        id: 1000,
        author: 1,
        message: typedText,
        attach: null,
        created_at: "2022-06-15T14:04:48.000Z",
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

    client.post.mockResolvedValue(resp);

    renderWithRedux(<Feed />, { initialState });

    let textBox = screen.getByPlaceholderText(/What's happening?/);
    expect(textBox).toBeInTheDocument();

    userEvent.type(textBox, typedText);

    let tweetButton = screen.getByRole("button", { name: /^tweet$/i });
    expect(tweetButton).toBeInTheDocument();

    userEvent.click(tweetButton);

    expect(await screen.findByText(typedText)).toBeInTheDocument();
    expect(textBox).toHaveDisplayValue("");
  });
});
