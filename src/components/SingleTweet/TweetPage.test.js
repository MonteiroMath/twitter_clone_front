import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../renderWithRedux";
import mocker from "../../testUtilities/mockers";

const mockedTweet = mocker.mockTweet();

const mockedTweetContent = mocker.mockTweetContent();

const initialState = mocker.mockInitialState({
  tweets: mocker.mockInitialSlice({ data: [mockedTweet] }),
  tweetContent: mocker.mockInitialSlice({ data: [mockedTweetContent] }),
});

jest.mock("../../api/client");

afterEach(cleanup);

describe("Comment tests", () => {
  test("Write a comment on tweet single page", async () => {
    const history = createMemoryHistory();
    history.push("/1");

    const typedText = "git gud";

    const resp = {
      success: true,
      updatedTweet: {
        tweet: mockedTweet,
        tweetContent: { ...mockedTweetContent, comment_ids: [1005] },
      },
      tweet: mocker.mockTweet({
        id: 1999,
        content: 99999,
        parent: mockedTweet.id,
      }),
      tweetContent: mocker.mockTweetContent({ id: 99999, message: typedText }),
    };

    //mock api response to post comment

    client.post.mockResolvedValue(resp);

    renderWithHistory(<TweetPage />, history, "/:id", {
      initialState,
    });

    expect(
      screen.getByText(/This is my second tweet lol getting good at this/i)
    ).toBeInTheDocument();

    let button = screen.getByRole("button", { name: /^comment$/i });
    expect(button).toBeDisabled();

    let commentBox = screen.getByPlaceholderText(/Answer this tweet/);

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
