import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import tweets from "../../placeholders/tweets";

import { renderWithRedux } from "../../testUtilities/renderWithProviders";
import NewTweet from "./NewTweet.js";

afterEach(cleanup);

describe("Rendering test", () => {
  test("Renders correctly", () => {
    renderWithRedux(<NewTweet />, { initialState: { tweets } });

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    expect(newTweet).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe("Field Interaction", () => {
  test("Adds text to the field when typed", () => {
    renderWithRedux(<NewTweet />);

    let typedText = "Typed by the user";

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    userEvent.type(newTweet, typedText);

    expect(newTweet.value).toBe(typedText);
    expect(button).not.toBeDisabled();
  });

  test("Empties input when tweet is clicked", () => {
    renderWithRedux(<NewTweet />);

    let typedText = "Typed by the user";
    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    userEvent.type(newTweet, typedText);

    userEvent.click(button);

    expect(newTweet.value).toBe("");
  });
});
