import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "./Feed";
import tweets from "../../placeholders/tweets";
import { renderWithRedux } from "../../renderWithRedux";

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
