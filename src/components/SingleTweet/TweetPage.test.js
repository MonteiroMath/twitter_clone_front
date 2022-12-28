import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../../api/client";
import { createMemoryHistory } from "history";
import TweetPage from "./TweetPage";
import { renderWithHistory } from "../../renderWithRedux";
import mocker from "../../testUtilities/mockers";


jest.mock("../../api/client");
let mockedTweet, mockedTweetContent, initialState;

beforeAll(() => {
  mockedTweet = mocker.mockTweet();
  mockedTweetContent = mocker.mockTweetContent();
  initialState = mocker.mockInitialState({
    tweets: mocker.mockInitialSlice({ data: [mockedTweet] }),
    tweetContent: mocker.mockInitialSlice({ data: [mockedTweetContent] }),
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

    let commentBox = screen.getByPlaceholderText(/Answer this tweet/);
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
