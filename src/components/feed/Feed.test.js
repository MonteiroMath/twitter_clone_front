import { render, screen, cleanup } from "@testing-library/react";
import Providers from "../Providers.js";

import Feed from "./Feed.js";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("Add new tweet", () => {
  test("Add a tweet to the top of the feed", () => {
    render(
      <Providers>
        <Feed />
      </Providers>
    );

    let textBox = screen.getByPlaceholderText(/What's happening?/);
    expect(textBox).toBeInTheDocument();

    let typedText = "Typed by the user";
    userEvent.type(textBox, typedText);

    let tweetButton = screen.getByRole("button", { name: /tweet/i });
    expect(tweetButton).toBeInTheDocument();

    userEvent.click(tweetButton);

    expect(textBox).toHaveDisplayValue("");
    expect(screen.getByText(typedText)).toBeInTheDocument();
  });
});
