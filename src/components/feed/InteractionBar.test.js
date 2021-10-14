import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Providers from "../Providers.js";

import Tweet from "./Tweet.js";

afterEach(cleanup);

const tweetMock = {
  id: 3,
  author: 1,
  created: new Date().getTime(),
  message: "Hate the character limit, anyone with me?",
  likes: 3,
  retweets: 0,
  comments: 0,
  attach: "",
  poll: false,
  pollSettings: {},
};

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
        <Tweet tweet={tweetMock} user={userMock} />
      </Providers>
    );

    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    let updatedLikes = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    expect(updatedLikes - likesNum).toBe(1);
  });

  test("Unlike tweet", () => {
    render(
      <Providers>
        <Tweet tweet={tweetMock} user={userMock} />
      </Providers>
    );

    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    let updatedLikes = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    expect(updatedLikes - likesNum).toBe(1);

    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    updatedLikes = parseInt(
      screen.getByLabelText("number of likes").textContent
    );

    expect(updatedLikes - likesNum).toBe(0);
  });
});
