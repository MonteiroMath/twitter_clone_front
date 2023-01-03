import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewTweet from "../NewTweet/NewTweet";

import { renderWithRedux } from "../../../../testUtilities/renderWithProviders";

afterEach(cleanup);

describe("Poll Form test", () => {
  test("All buttons should be disabled when the form is not filled", () => {
    renderWithRedux(<NewTweet />);

    const pollButton = screen.getByRole("button", { name: /add poll/i });
    const tweetButton = screen.getByRole("button", { name: /tweet/i });
    const addImgButton = screen.getByTestId("imgAttach");

    userEvent.click(pollButton);

    expect(tweetButton).toBeDisabled();
    expect(pollButton).toBeDisabled();
    expect(addImgButton).toBeDisabled();
  });

  test("Tweet button remains blocked until everything is filled", () => {
    renderWithRedux(<NewTweet />);

    const pollButton = screen.getByRole("button", { name: /add poll/i });
    const tweetButton = screen.getByRole("button", { name: /tweet/i });
    const textBox = screen.getByPlaceholderText(/what's happening?/i);

    //User starts poll
    userEvent.click(pollButton);

    //User fills message
    userEvent.type(textBox, "What do you think?");
    expect(tweetButton).toBeDisabled();

    //User fills first option
    const firstChoiceInp = screen.getByRole("textbox", { name: /choice 1/i });
    userEvent.type(firstChoiceInp, "Option 1");
    expect(tweetButton).toBeDisabled();

    //User fills second option
    const secondChoiceInp = screen.getByRole("textbox", { name: /choice 2/i });
    userEvent.type(secondChoiceInp, "Option 2");
    expect(tweetButton).toBeDisabled();

    //User picks a number of days
    const daysField = screen.getByRole("combobox", { name: /days/i });
    userEvent.selectOptions(daysField, ["1"]);
    expect(tweetButton).not.toBeDisabled();

    //User sets days to 0 again
    userEvent.selectOptions(daysField, ["0"]);
    expect(tweetButton).toBeDisabled();
  });

  test("Remove poll clears poll form", () => {
    renderWithRedux(<NewTweet />);

    //User starts poll
    const pollButton = screen.getByRole("button", { name: /add poll/i });
    userEvent.click(pollButton);

    //User fills poll form
    userEvent.type(
      screen.getByRole("textbox", { name: /choice 1/i }),
      "Option 1"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /choice 2/i }),
      "Option 2"
    );
    userEvent.selectOptions(screen.getByRole("combobox", { name: /days/i }), [
      "1",
    ]);

    //User cancels poll
    userEvent.click(screen.getByRole("button", { name: /remove poll/i }));

    //Expect poll form to dissapear
    expect(
      screen.queryByRole("textbox", { name: /choice 1/i })
    ).not.toBeInTheDocument();

    //User starts new pool
    userEvent.click(pollButton);

    //Expect poll form to be cleared
    expect(
      screen.getByRole("textbox", { name: /choice 1/i }).value
    ).toHaveLength(0);
    expect(
      screen.getByRole("textbox", { name: /choice 2/i }).value
    ).toHaveLength(0);
    expect(screen.getByRole("combobox", { name: /days/i }).value).toBe("0");
  });

  test("Tweeting clears poll form", () => {
    renderWithRedux(<NewTweet />);

    //User starts poll
    const pollButton = screen.getByRole("button", { name: /add poll/i });
    userEvent.click(pollButton);

    //User fills poll form
    userEvent.type(
      screen.getByPlaceholderText(/what's happening?/i),
      "What is your opinion?"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /choice 1/i }),
      "Option 1"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: /choice 2/i }),
      "Option 2"
    );
    userEvent.selectOptions(screen.getByRole("combobox", { name: /days/i }), [
      "1",
    ]);

    //User submits new tweet with poll
    userEvent.click(screen.getByRole("button", { name: /tweet/i }));

    //Expect poll form to disappear
    expect(
      screen.queryByRole("textbox", { name: /choice 1/i })
    ).not.toBeInTheDocument();

    //User starts new poll
    userEvent.click(pollButton);

    //Expect poll form to be cleared
    expect(
      screen.getByRole("textbox", { name: /choice 1/i }).value
    ).toHaveLength(0);
    expect(
      screen.getByRole("textbox", { name: /choice 2/i }).value
    ).toHaveLength(0);
    expect(screen.getByRole("combobox", { name: /days/i }).value).toBe("0");
  });
});
