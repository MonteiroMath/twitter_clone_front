import { screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { renderWithHistory } from "../../../testUtilities/renderWithProviders";
import { client } from "../../../api/client";

import LoginPage from "../LoginPage";

afterEach(cleanup);

jest.mock("../../../api/client");

describe("User login", () => {
  test("With correct data", async () => {
    const testHistory = createMemoryHistory();

    const userData = {
      email: "testuser2@test.com",
      password: "123456",
    };

    const responseMock = {
      success: true,
      jwtToken: 1,
      user: {
        id: 43,
        username: "TestUser",
        email: "testuser2@test.com",
        description: "",
        webpage: "",
        birthDate: "1992-01-01T00:00:00.000Z",
        avatar: null,
        background: null,
        createdAt: "2024-03-18T12:07:41.000Z",
        updatedAt: "2024-03-18T12:07:41.000Z",
      },
    };

    client.login.mockResolvedValueOnce(responseMock);

    renderWithHistory(<LoginPage />, testHistory, "/");

    let signinButton = screen.getByText(/sign in/i);
    expect(signinButton).toBeInTheDocument();

    userEvent.click(signinButton);

    let inputField = screen.getByLabelText(/email/i);
    userEvent.type(inputField, userData.email);

    inputField = screen.getByLabelText(/password/i);
    userEvent.type(inputField, userData.password);

    let loginButton = screen.getByText(/login/i);
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(testHistory.location.pathname).toBe("/home");
    });
  });

  test("With server offline", async () => {
    const testHistory = createMemoryHistory();

    const userData = {
      email: "testuser2@test.com",
      password: "123456",
    };

    client.login.mockImplementationOnce(() => {
      throw new Error("Failed to fetch");
    });

    renderWithHistory(<LoginPage />, testHistory, "/");

    let signinButton = screen.getByText(/sign in/i);
    expect(signinButton).toBeInTheDocument();

    userEvent.click(signinButton);

    let inputField = screen.getByLabelText(/email/i);
    userEvent.type(inputField, userData.email);

    inputField = screen.getByLabelText(/password/i);
    userEvent.type(inputField, userData.password);

    let loginButton = screen.getByText(/login/i);
    userEvent.click(loginButton);

    await waitFor(() => {
      let errMessage = screen.getByText(
        /Sorry, there was an error. Please, try again later or contact the support./i
      );
      expect(errMessage).toBeInTheDocument();
    });
  });

  test("User doesn exist", async () => {
    const testHistory = createMemoryHistory();

    const userData = {
      email: "wronguserthatdoesntexist",
      password: "123456",
    };

    const responseMock = {
      success: false,
      msg: "User not found",
      err: 404,
    };

    client.login.mockResolvedValueOnce(responseMock);

    renderWithHistory(<LoginPage />, testHistory, "/");

    let signinButton = screen.getByText(/sign in/i);
    expect(signinButton).toBeInTheDocument();

    userEvent.click(signinButton);

    let inputField = screen.getByLabelText(/email/i);
    userEvent.type(inputField, userData.email);

    inputField = screen.getByLabelText(/password/i);
    userEvent.type(inputField, userData.password);

    let loginButton = screen.getByText(/login/i);
    userEvent.click(loginButton);

    await waitFor(() => {
      let errMessage = screen.getByText(/User not found/i);
      expect(errMessage).toBeInTheDocument();
    });
  });

  test("Wrong password", async () => {
    const testHistory = createMemoryHistory();

    const userData = {
      email: "correctuser",
      password: "wrongpassword123456",
    };

    const responseMock = {
      success: false,
      msg: "Wrong Password",
      err: 401,
    };

    client.login.mockResolvedValueOnce(responseMock);

    renderWithHistory(<LoginPage />, testHistory, "/");

    let signinButton = screen.getByText(/sign in/i);
    expect(signinButton).toBeInTheDocument();

    userEvent.click(signinButton);

    let inputField = screen.getByLabelText(/email/i);
    userEvent.type(inputField, userData.email);

    inputField = screen.getByLabelText(/password/i);
    userEvent.type(inputField, userData.password);

    let loginButton = screen.getByText(/login/i);
    userEvent.click(loginButton);

    await waitFor(() => {
      let errMessage = screen.getByText(/Wrong Password/i);
      expect(errMessage).toBeInTheDocument();
    });
  });
});
