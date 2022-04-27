import { screen, cleanup, findByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "./Feed";
import tweets from "../../placeholders/tweets";
import { renderWithRedux } from "../../renderWithRedux";
import { client } from "../../api/client";

jest.mock("../../api/client");

const initialState = {
  status: "fullfiled",
  error: null,
  tweets: [
    {
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
    },
  ],
};

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", async () => {
    client.put.mockResolvedValue({
      success: true,
      tweet: { ...initialState.tweets[0], liked_by: [1] },
    });

    renderWithRedux(<Feed />, { initialState: { tweets: initialState } });

    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    let likesLabel = await screen.findByLabelText("number of likes");
    let updatedLikes = parseInt(likesLabel.textContent);

    expect(updatedLikes - likesNum).toBe(1);
  });

  test("Unlike tweet", async () => {
    client.put
      .mockImplementationOnce(() => {
        return {
          success: true,
          tweet: { ...initialState.tweets[0], liked_by: [1] },
        };
      })
      .mockImplementationOnce(() => {
        return {
          success: true,
          tweet: { ...initialState.tweets[0], liked_by: [] },
        };
      });

    renderWithRedux(<Feed />, { initialState: { tweets: initialState } });

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
  client.post.mockResolvedValue({
    success: true,
    updatedTweet: { ...initialState.tweets[0], retweeted_by: [1] },
    retweet: {
      id: 1005,
      author: 1,
      created: new Date().getTime(),
      tweetId: initialState.tweets[0].id,
    },
  });

  renderWithRedux(<Feed />, { initialState: { tweets: initialState } });

  const retweetNum = screen.queryAllByText(/you retweeted/i).length;

  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));

  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  let youRetweetedList = await screen.findAllByText(/you retweeted/i);
  const posRetweetNum = youRetweetedList.length;

  expect(posRetweetNum - retweetNum).toBe(1);
});

test("Comment tweet with button", () => {
  /*

    render tweet
    get button
    click button
    check if modal open
    get box
    write comment
    click tweet button
    check modal closed
    check tweet on screen

  */

  renderWithRedux(<Feed />, { initialState: { tweets: tweets_mock } });

  const tweet = screen.getByText(
    /This is my second tweet lol getting good at this/i
  );
  expect(tweet).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /^comment tweet$/i }));

  let button = screen.getByRole("button", { name: /^comment$/i });
  expect(button).toBeDisabled();

  const commentBox = screen.getByPlaceholderText(/Answer this tweet/);
  const typedText = "I'm testing this comment stuff";

  userEvent.type(commentBox, typedText);

  expect(commentBox.value).toBe(typedText);
  expect(button).not.toBeDisabled();

  userEvent.click(button);
  expect(commentBox.value).toBe("");
  expect(screen.getByText(typedText)).toBeInTheDocument();
});
