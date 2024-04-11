import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../testUtilities/renderWithProviders";
import { client } from "../../api/client";
import FeedPage from "./FeedPage.js";

import mocker from "../../testUtilities/mockers";

const tweetListMock = [mocker.mockTweet()];

const initialState = mocker.mockInitialState({
  user: mocker.mockInitialState({
    data: { user: mocker.mockUser(), jwtToken: 1 },
  }),
});

afterEach(cleanup);
jest.mock("../../api/client");

describe("Add new tweet", () => {
  test("Add a tweet to the top of the feed", async () => {
    const typedText = "Typed by the user";

    const resp = {
      success: true,
      tweet: mocker.mockTweet({ id: 1111, message: typedText }),
    };

    client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });
    client.post.mockResolvedValue(resp);

    renderWithRedux(<FeedPage />, { initialState });

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
