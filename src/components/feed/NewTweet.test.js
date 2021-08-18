import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewTweet from "./NewTweet.js";

afterEach(cleanup);

describe("Field Interaction", () => {
  test("Adds text to the field when typed", () => {
    render(<NewTweet />);
    expect(
      screen.getByPlaceholderText(/What's happening?/)
    ).toBeInTheDocument();

    let typedText = "Typed by the user";
    userEvent.type(screen.getByPlaceholderText(/What's happening?/), typedText);

    expect(screen.getByDisplayValue(typedText)).toBeInTheDocument();
  });
});

