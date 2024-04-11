import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../../../../testUtilities/renderWithProviders";
import { client } from "../../../../../api/client";
import mocker from "../../../../../testUtilities/mockers";

import FeedPage from "../../../../FeedPage/FeedPage";

jest.mock("../../../../../api/client");

let tweetListMock, mockedTweet, mockedUser, initialState;

beforeAll(() => {
  mockedTweet = mocker.mockTweet();
  tweetListMock = [mockedTweet];
  mockedUser = mocker.mockUser();
  initialState = mocker.mockInitialState({
    tweets: mocker.mockInitialSlice(),
    user: mocker.mockInitialSlice({
      data: { user: mockedUser, jwtToken: 1 },
    }),
  });
});

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", async () => {
    //mock api response to liking a tweet
    client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });
    client.post.mockResolvedValue({
      success: true,
      updatedTweet: {
        ...mockedTweet,
        likesCount: mockedTweet.likesCount + 1,
        liked: 1,
      },
    });

    renderWithRedux(<FeedPage />, { initialState });

    const likeButton = await screen.findByRole("button", {
      name: /^like tweet$/i,
    });
    //click the like button
    userEvent.click(likeButton);

    //check number of likes the tweet has after the click
    const likesLabel = await screen.findByLabelText("number of likes");
    const updatedLikes = parseInt(likesLabel.textContent);
    expect(updatedLikes).toBe(1);
  });

  test("Unlike tweet", async () => {
    //mock api response to liking and unliking a tweet
    client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });
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
    userEvent.click(
      await screen.findByRole("button", { name: /^like tweet$/i })
    );
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
  client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });

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
  userEvent.click(await screen.findByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  let retweetCounter = await screen.findByLabelText("number of retweets");

  expect(parseInt(retweetCounter.textContent)).toBe(1);
});

test("Undo retweet", async () => {
  client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });
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
  userEvent.click(await screen.findByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  //click retweet button
  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));

  //click undo retweet button
  userEvent.click(
    await screen.findByRole("menuitem", { name: /undo retweet/i })
  );

    //check if retweet number is updated
    await waitFor(async () => {
      let retweetCounter = await screen.findByLabelText("number of retweets");
      expect(parseInt(retweetCounter.textContent)).toBe(0);
    });
 
});


test("Comment tweet with button", async () => {
  client.get.mockResolvedValue({ success: true, tweets: [...tweetListMock] });
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

  const tweet = await screen.findByText(mockedTweet.message);
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

