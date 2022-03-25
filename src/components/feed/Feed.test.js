import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import tweets from "../../placeholders/tweets";
import { renderWithRedux } from "../../renderWithRedux";

import Feed from "./Feed.js";


afterEach(cleanup);

describe("Add new tweet", () => {
  test("Add a tweet to the top of the feed", () => {
    renderWithRedux(<Feed />, { initialState: { tweets } });

    let textBox = screen.getByPlaceholderText(/What's happening?/);
    expect(textBox).toBeInTheDocument();

    let typedText = "Typed by the user";
    userEvent.type(textBox, typedText);

    let tweetButton = screen.getByRole("button", { name: /^tweet$/i });
    expect(tweetButton).toBeInTheDocument();

    userEvent.click(tweetButton);

    expect(textBox).toHaveDisplayValue("");
    expect(screen.getByText(typedText)).toBeInTheDocument();
  });
});
