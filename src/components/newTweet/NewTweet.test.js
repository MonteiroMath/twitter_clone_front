import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Providers from "../Providers";
import NewTweet from "./NewTweet.js";

import testImage from "../../../public/images/test.jpeg";

afterEach(cleanup);

describe("Rendering test", () => {
  test("Renders correctly", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    expect(newTweet).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe("Field Interaction", () => {
  test("Adds text to the field when typed", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    let typedText = "Typed by the user";
    userEvent.type(newTweet, typedText);

    expect(newTweet.value).toBe(typedText);
    expect(button).not.toBeDisabled();
  });

  test("Empties input when tweet is clicked", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    let typedText = "Typed by the user";
    userEvent.type(newTweet, typedText);

    userEvent.click(button);

    expect(newTweet.value).toBe("");
  });
});
