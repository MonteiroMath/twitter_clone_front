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
