import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import tweets from "../../placeholders/tweets";
import { renderWithHistory } from "../../renderWithRedux";

const tweetsInitialState = {
  status: "idle",
  error: null,
  tweets: [],
};

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", () => {
    const history = createMemoryHistory();
    history.push("/1");

    renderWithHistory(<TweetPage />, history, "/:id", {
      initialState: { tweets: tweetsInitialState },
    });
    expect(
      screen.getByText(/This is my second tweet lol getting good at this/i)
    ).toBeInTheDocument();

    let button = screen.getByRole("button", { name: /^comment$/i });
    expect(button).toBeDisabled();

    let commentBox = screen.getByPlaceholderText(/Answer this tweet/);
    let typedText = "git gud";
    userEvent.type(commentBox, typedText);

    expect(commentBox.value).toBe(typedText);
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(commentBox.value).toBe("");
    expect(screen.getByText(typedText)).toBeInTheDocument();
  });
});
