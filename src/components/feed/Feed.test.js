/*

  test:

  todo: tweet button add a tweet to the list

*/

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Feed from "./Feed.js";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("Add new tweet", () => {
  test("Add a tweet to the top of the feed", () => {
    render(<Feed />);

    let textBox = screen.getByPlaceholderText(/What's happening?/);

    expect(textBox).toBeInTheDocument();

    let typedText = "Typed by the user";
    userEvent.type(textBox, typedText);

    let tweetButton = screen.getByText(/Tweet/);
    expect(tweetButton).toBeInTheDocument();

    userEvent.click(tweetButton);

    expect(textBox).toHaveDisplayValue("");
    expect(screen.getByText(typedText)).toBeInTheDocument();
  });
});
