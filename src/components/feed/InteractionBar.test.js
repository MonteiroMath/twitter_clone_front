import { screen, cleanup, findByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "./Feed";
import tweets from "../../placeholders/tweets";
import { renderWithRedux } from "../../renderWithRedux";
import { client } from "../../api/client";

jest.mock("../../api/client");

function mockTweet() {
  return {
    id: 1,
    author: 1,
    created: new Date().getTime(),
    message: "This is my second tweet lol getting good at this",
    liked_by: [],
    retweeted_by: [],
    comment_ids: [],
    attach: "",
    poll: false,
    pollSettings: {},
    retweet: null,
  };
}

const initialState = {
  tweets: {
    status: "fullfiled",
    error: null,
    tweets: [mockTweet()],
  },
};

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", async () => {
    client.put.mockResolvedValue({
      success: true,
      tweet: { ...mockTweet(), liked_by: [1] },
    });

    renderWithRedux(<Feed />, { initialState });

    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    let likesLabel = await screen.findByLabelText("number of likes");
    let updatedLikes = parseInt(likesLabel.textContent);

    expect(updatedLikes - likesNum).toBe(1);
  });

  test("Unlike tweet", async () => {
    const oldTweet = mockTweet();
    client.put
      .mockImplementationOnce(() => {
        return {
          success: true,
          tweet: { ...oldTweet, liked_by: [1] },
        };
      })
      .mockImplementationOnce(() => {
        return {
          success: true,
          tweet: { ...oldTweet, liked_by: [] },
        };
      });

    renderWithRedux(<Feed />, { initialState });

    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    let likesLabel = await screen.findByLabelText("number of likes");
    let updatedLikes = parseInt(likesLabel.textContent);

    expect(updatedLikes - likesNum).toBe(1);

    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    likesLabel = await screen.findByLabelText("number of likes");
    updatedLikes = parseInt(likesLabel.textContent);

    expect(updatedLikes - likesNum).toBe(0);
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
  const oldTweet = mockTweet();

  client.post.mockResolvedValue({
    success: true,
    updatedTweet: { ...oldTweet, retweeted_by: [1] },
    retweet: {
      id: 1005,
      author: 1,
      created: new Date().getTime(),
      tweetId: oldTweet.id,
    },
  });

  renderWithRedux(<Feed />, { initialState });

  const retweetNum = screen.queryAllByText(/you retweeted/i).length;

  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));

  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  let youRetweetedList = await screen.findAllByText(/you retweeted/i);
  const posRetweetNum = youRetweetedList.length;

  expect(posRetweetNum - retweetNum).toBe(1);
});

test("Comment tweet with button", async () => {
  //render tweet
  //get button
  //click button
  //check if modal open
  //get box
  //write comment
  //click tweet button
  //check modal closed
  //check tweet on screen

  const typedText = "I'm testing this comment stuff";
  const oldTweet = mockTweet();

  client.post.mockResolvedValue({
    success: true,
    updatedTweet: { ...oldTweet, commen_ids: [1005] },
    comment: {
      id: 1005,
      author: 1,
      created: new Date().getTime(),
      message: typedText,
      attach: "",
      poll: false,
      retweet: null,
      retweeted_by: [],
      liked_by: [],
      comment_ids: [],
      pollSettings: {
        choices: null,
        pollLen: null,
        votes: [0, 0],
      },
    },
  });

  renderWithRedux(<Feed />, { initialState });

  const tweet = screen.getByText(
    /This is my second tweet lol getting good at this/i
  );
  expect(tweet).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /^comment tweet$/i }));

  let button = screen.getByRole("button", { name: /^comment$/i });
  expect(button).toBeDisabled();

  const commentBox = screen.getByPlaceholderText(/Answer this tweet/);

  userEvent.type(commentBox, typedText);

  expect(commentBox.value).toBe(typedText);
  expect(button).not.toBeDisabled();

  userEvent.click(button);
  expect(commentBox.value).toBe("");

  const newComment = await screen.findByText(typedText);
  expect(newComment).toBeInTheDocument();
});
