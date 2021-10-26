import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Providers from "../Providers.js";

import TweetList from "./TweetList";

afterEach(cleanup);

const userMock = {
  id: 1,
  username: "Timóteo",
  description: "This is a description",
  webpage: "https://github.com/",
  joined: new Date(),
  birth: "28/05/1992",
  avatar: "",
  background: "",
  following: [""],
  followers: [""],
};

describe("Like tests", () => {
  test("Tweet get one more like", () => {
    render(
      <Providers>
        <TweetList user={userMock} />
      </Providers>
    );

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
    render(
      <Providers>
        <TweetList user={userMock} />
      </Providers>
    );

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

test("Simple Retweet test", () => {
  /*
  - Get retweet button x
  - Click retweet button x
  - get simple retweet button x
  - click simple retweet button x
  - check that the menu has been closed
  - try to get the simples retweet button - shouldn't be able to
  - check if the retweet has been inserted
  */

  render(
    <Providers>
      <TweetList user={userMock} />
    </Providers>
  );

  const retweetNum = screen.getAllByText(/you retweeted/i).length;

  userEvent.click(screen.getAllByRole("button", { name: /^Retweet$/i })[0]);

  userEvent.click(screen.getByRole("menuitem", /retweet/i));

  expect(screen.queryByRole("menuitem", /retweet/i)).toBeNull();

  const posRetweetNum = screen.getAllByText(/you retweeted/i).length;

  expect(posRetweetNum - retweetNum).toBe(1);
});

test("Retweet with a quote test", () => {
  /*
  - Get retweet button
  - Click retweet button
  - get comment button
  - click comment button
  - check that the menu has been closed
  - get the textArea field
  - Type comment
  - get Tweet Button
  - Click tweet button
  - Check that the modal is closed
  - check if the retweet has been inserted
  */

  render(
    <Providers>
      <TweetList user={userMock} />
    </Providers>
  );

  const retweetNum = screen.getAllByText(/you retweeted/i).length;

  userEvent.click(screen.getAllByRole("button", { name: /^Retweet$/i })[0]);

  userEvent.click(screen.getByRole("menuitem", /quote tweet/i));

  userEvent.type(
    screen.getByPlaceholderText(/that's happening/i),
    "I retweeted this"
  );

  userEvent.click(screen.getByRole("button", /tweet/i));

  const posRetweetNum = screen.getAllByText(/you retweeted/i).length;

  expect(posRetweetNum - retweetNum).toBe(1);
});
