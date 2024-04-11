import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../testUtilities/renderWithProviders";
import mocker from "../../testUtilities/mockers";

jest.mock("../../api/client");
let mockedTweet, mockedUser, initialState;

beforeAll(() => {
  mockedTweet = mocker.mockTweet();
  mockedUser = mocker.mockUser();
  initialState = mocker.mockInitialState({
    tweets: mocker.mockInitialSlice({ data: [] }),
    user: mocker.mockInitialSlice({ data: { user: mockedUser, jwtToken: 1 } }),
  });
});

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", async () => {
    //arrange
    const history = createMemoryHistory();
    history.push("/1");
    const typedText = "git gud";
    const resp = {
      success: true,
      updatedTweet: {
        ...mockedTweet,
        commentsCount: mockedTweet.commentsCount + 1,
      },
      tweet: mocker.mockTweet({
        id: 1999,
        type: "comment",
        message: typedText,
        referenceId: mockedTweet.id,
        reference: mockedTweet,
      }),
    };

    //mock api response to post comment
    client.get.mockResolvedValue({ success: true, tweets: [mockedTweet] });
    client.post.mockResolvedValue(resp);

    renderWithHistory(<TweetPage />, history, "/:id", {
      initialState,
    });

    let commentBox = await screen.findByPlaceholderText(/Answer tweet/);
    let button = screen.getByRole("button", { name: /^comment$/i });

    expect(button).toBeDisabled();

    //type new comment
    userEvent.type(commentBox, typedText);

    expect(commentBox.value).toBe(typedText);
    expect(button).not.toBeDisabled();

    //click sent comment button
    userEvent.click(button);
    //check if new comment was sent
    expect(await screen.findByText(typedText)).toBeInTheDocument();
    expect(commentBox.value).toBe("");
  });
});
