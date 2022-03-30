import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "./Feed";
import tweets from "../../placeholders/tweets";
import { renderWithRedux } from "../../renderWithRedux";

let tweets_mock = [
  {
    id: 1,
    author: 1,
    created: new Date().getTime(),
    message: "This is my second tweet lol getting good at this",
    likes: 3,
    retweets: 0,
    liked_by: [],
    retweeted_by: [],
    comment_ids: [],
    comments: 0,
    attach: "",
    poll: false,
    pollSettings: {},
    retweet: null,
  },
];

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", () => {
    renderWithRedux(<Feed />, { initialState: { tweets } });

    const likesNum = parseInt(
      screen.getAllByLabelText("number of likes")[0].textContent
    );
    userEvent.click(
      screen.getAllByRole("button", { name: /^like tweet$/i })[0]
    );

    let updatedLikes = parseInt(
      screen.getAllByLabelText("number of likes")[0].textContent
    );

    expect(updatedLikes - likesNum).toBe(1);
  });

  test("Unlike tweet", () => {
    renderWithRedux(<Feed />, { initialState: { tweets } });

    const likesNum = parseInt(
      screen.getAllByLabelText("number of likes")[2].textContent
    );

    userEvent.click(
      screen.getAllByRole("button", { name: /^like tweet$/i })[2]
    );

    let updatedLikes = parseInt(
      screen.getAllByLabelText("number of likes")[2].textContent
    );

    expect(updatedLikes - likesNum).toBe(1);

    userEvent.click(
      screen.getAllByRole("button", { name: /^like tweet$/i })[2]
    );

    updatedLikes = parseInt(
      screen.getAllByLabelText("number of likes")[2].textContent
    );

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

test("Simple Retweet test", () => {
  renderWithRedux(<Feed />, { initialState: { tweets } });

  const retweetNum = screen.getAllByText(/you retweeted/i).length;

  userEvent.click(screen.getAllByRole("button", { name: /^Retweet$/i })[0]);

  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  const posRetweetNum = screen.getAllByText(/you retweeted/i).length;

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
