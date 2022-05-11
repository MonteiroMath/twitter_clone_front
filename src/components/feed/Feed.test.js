import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../renderWithRedux";
import { client } from "../../api/client";
import Feed from "./Feed.js";

const initialState = {
  tweets: {
    status: "fullfiled",
    error: null,
    tweets: [],
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
        created_at: new Date().getTime(),
        message: typedText,
        attach: "",
        poll: false,
        retweet: null,
        retweeted_by: [],
        liked_by: [],
        comment_ids: [],
        pollSettings: {},
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
