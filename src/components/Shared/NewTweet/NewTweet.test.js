import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRedux } from "../../../testUtilities/renderWithProviders";
import NewTweet from "./NewTweet";

import mocker from "../../../testUtilities/mockers";

let mockedUser, initialState;

beforeAll(() => {
  mockedUser = mocker.mockUser();
  initialState = mocker.mockInitialState({
    user: mocker.mockInitialSlice({ data: { user: mockedUser, jwtToken: 1 } }),
  });
});

afterEach(cleanup);

describe("Rendering test", () => {
  test("Renders correctly", () => {
    renderWithRedux(<NewTweet />, { initialState });

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    expect(newTweet).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe("Field Interaction", () => {
  test("Adds text to the field when typed", () => {
    renderWithRedux(<NewTweet />, { initialState });

    let typedText = "Typed by the user";

    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    userEvent.type(newTweet, typedText);

    expect(newTweet.value).toBe(typedText);
    expect(button).not.toBeDisabled();
  });

  test("Empties input when tweet is clicked", () => {
    renderWithRedux(<NewTweet />, { initialState });

    let typedText = "Typed by the user";
    let button = screen.getByText("Tweet");
    let newTweet = screen.getByPlaceholderText(/What's happening?/);

    userEvent.type(newTweet, typedText);

    userEvent.click(button);

    expect(newTweet.value).toBe("");
  });
});
