import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../../../../testUtilities/renderWithProviders";
import { client } from "../../../../../api/client";
import mocker from "../../../../../testUtilities/mockers";

import FeedPage from "../../../../FeedPage/FeedPage";

jest.mock("../../../../../api/client");

let mockedTweet, mockedUser, initialState;

beforeAll(() => {
  mockedTweet = mocker.mockTweet();
  mockedUser = mocker.mockUser();
  initialState = mocker.mockInitialState({
    tweets: mocker.mockInitialSlice({
      data: [mockedTweet],
    }),
    user: mocker.mockInitialSlice({
      data: { user: mockedUser, jwtToken: 1 },
    }),
  });
});

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", async () => {
    //mock api response to liking a tweet
    client.post.mockResolvedValue({
      success: true,
      updatedTweet: {
        ...mockedTweet,
        likesCount: mockedTweet.likesCount + 1,
        liked: 1,
      },
    });

    renderWithRedux(<FeedPage />, { initialState });

    //click the like button
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    //check number of likes the tweet has after the click
    const likesLabel = await screen.findByLabelText("number of likes");
    const updatedLikes = parseInt(likesLabel.textContent);
    expect(updatedLikes).toBe(1);
  });

  test("Unlike tweet", async () => {
    //mock api response to liking and unliking a tweet
    client.post
      .mockImplementationOnce(() => {
        return {
          success: true,
          updatedTweet: {
            ...mockedTweet,
            likesCount: mockedTweet.likesCount + 1,
            liked: 1,
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          success: true,
          updatedTweet: { ...mockedTweet },
        };
      });

    renderWithRedux(<FeedPage />, { initialState });

    //click the like button
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));
    //click Like button again
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    //check number of likes the tweet has after the second click
    let likesLabel = await screen.findByLabelText("number of likes");
    let likes = parseInt(likesLabel.textContent);
    expect(likes).toBe(0);
  });
});

/*
  - Get retweet button x
  - Click retweet button x
  - get simple retweet button x
  - click simple retweet button x
  - check that the menu has been closed
  - try to get the simples retweet button - shouldn't be able to
  - check if the retweet has been inserted
  */

test("Simple Retweet test", async () => {
  const newTweet = mocker.mockTweet({
    id: 10055,
    type: "retweet",
    message: "",
    referenceId: 1,
    reference: mockedTweet,
  });

  //mock api response to post retweet
  client.post.mockResolvedValue({
    success: true,
    updatedTweet: {
      ...mockedTweet,
      retweetsCount: mockedTweet.retweetsCount + 1,
      retweeted: 1,
    },
    tweet: newTweet,
  });

  renderWithRedux(<FeedPage />, { initialState });

  //click retweet button
  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  //check if a new retweet is on the page
  let youRetweeted = await screen.findByText(/you retweeted/i);
  expect(youRetweeted).toBeInTheDocument();

  //check if retweet number is updated
  let retweetCounters = screen
    .getAllByLabelText("number of retweets")
    .map((counter) => parseInt(counter.textContent));
  expect(retweetCounters[0]).toBe(retweetCounters[1]);
  expect(retweetCounters[0]).toBe(1);
});

test("Undo retweet", async () => {
  const newTweet = mocker.mockTweet({
    id: 10055,
    type: "retweet",
    message: "",
    referenceId: mockedTweet.id,
    reference: mockedTweet,
  });

  //mock api response to post and delete retweet
  client.post.mockResolvedValue({
    success: true,
    updatedTweet: {
      ...mockedTweet,
      retweetsCount: mockedTweet.retweetsCount + 1,
      retweeted: 1,
    },
    tweet: newTweet,
  });

  client.delete.mockResolvedValue({
    success: true,
    updatedTweet: { ...mockedTweet },
  });

  renderWithRedux(<FeedPage />, { initialState });

  //click retweet button
  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  //check if a new retweet is on the page
  let youRetweeted = await screen.findByText(/you retweeted/i);
  expect(youRetweeted).toBeInTheDocument();

  //click retweet button
  userEvent.click(screen.getAllByRole("button", { name: /^Retweet$/i })[0]);

  //click undo retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /undo retweet/i }));

  await waitFor(() => {
    expect(screen.queryByText(/you retweeted/i)).not.toBeInTheDocument();
  });

  //check if retweet number is updated
  let retweetCounters = parseInt(
    screen.getByLabelText("number of retweets").textContent
  );
  expect(retweetCounters).toBe(0);
});

test("Comment tweet with button", async () => {
  const typedText = "I'm testing this answer stuff";

  //mock api response to post cmment
  client.post.mockResolvedValue({
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
  });

  renderWithRedux(<FeedPage />, { initialState });

  const tweet = screen.getByText(mockedTweet.message);
  expect(tweet).toBeInTheDocument();

  //click comment button
  userEvent.click(screen.getByRole("button", { name: /^comment tweet$/i }));

  let button = screen.getByRole("button", { name: /^comment$/i });
  expect(button).toBeDisabled();

  //type new comment
  const commentBox = screen.getByPlaceholderText(/Answer tweet/);
  userEvent.type(commentBox, typedText);

  expect(commentBox.value).toBe(typedText);
  expect(button).not.toBeDisabled();

  //click button to send comment
  userEvent.click(button);
  expect(commentBox.value).toBe("");

  //check if comment was sent
  const newComment = await screen.findByText(typedText);
  expect(newComment).toBeInTheDocument();
});
