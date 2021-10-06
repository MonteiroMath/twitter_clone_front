import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Providers from "../Providers";
import NewTweet from "./NewTweet";

afterEach(cleanup);

describe("Poll Form test", () => {
  test("Tweet button remains blocked until everything is filled", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    const pollButton = screen.getByRole("button", { name: /add poll/i });
    const tweetButton = screen.getByRole("button", { name: /tweet/i });
    const addImgButton = screen.getByTestId("imgAttach");
    const textBox = screen.getByPlaceholderText(/what's happening?/i);

    userEvent.click(pollButton);

    expect(tweetButton).toBeDisabled();
    expect(pollButton).toBeDisabled();
    expect(addImgButton).toBeDisabled();

    userEvent.type(textBox, "What do you think?");
    expect(tweetButton).toBeDisabled();

    const firstChoiceInp = screen.getByRole("textbox", { name: /choice 1/i });
    const secondChoiceInp = screen.getByRole("textbox", { name: /choice 2/i });

    userEvent.type(firstChoiceInp, "Option 1");
    expect(tweetButton).toBeDisabled();

    userEvent.type(secondChoiceInp, "Option 2");
    expect(tweetButton).toBeDisabled();

    const daysField = screen.getByRole("combobox", { name: /days/i });

    userEvent.selectOptions(daysField, ["1"]);
    expect(tweetButton).not.toBeDisabled();

    userEvent.selectOptions(daysField, ["0"]);
    expect(tweetButton).toBeDisabled();
  });

  test("Remove poll clears poll form", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    const pollButton = screen.getByRole("button", { name: /add poll/i });

    userEvent.click(pollButton);

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

    userEvent.click(screen.getByRole("button", { name: /remove poll/i }));

    expect(
      screen.queryByRole("textbox", { name: /choice 1/i })
    ).not.toBeInTheDocument();
    userEvent.click(pollButton);

    expect(screen.getByRole("textbox", { name: /choice 1/i }).value).toBe("");
    expect(screen.getByRole("textbox", { name: /choice 2/i }).value).toBe("");
    expect(screen.getByRole("combobox", { name: /days/i }).value).toBe("0");
  });

  test("Tweeting clears poll form", () => {
    render(
      <Providers>
        <NewTweet />
      </Providers>
    );

    const pollButton = screen.getByRole("button", { name: /add poll/i });

    userEvent.click(pollButton);

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

    userEvent.click(screen.getByRole("button", { name: /tweet/i }));

    expect(
      screen.queryByRole("textbox", { name: /choice 1/i })
    ).not.toBeInTheDocument();
    userEvent.click(pollButton);

    expect(screen.getByRole("textbox", { name: /choice 1/i }).value).toBe("");
    expect(screen.getByRole("textbox", { name: /choice 2/i }).value).toBe("");
    expect(screen.getByRole("combobox", { name: /days/i }).value).toBe("0");
  });
});
