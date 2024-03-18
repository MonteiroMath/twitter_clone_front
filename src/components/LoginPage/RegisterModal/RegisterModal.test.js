import {
  screen,
  cleanup,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { renderWithHistory } from "../../../testUtilities/renderWithProviders";
import { client } from "../../../api/client";

import LoginPage from "../LoginPage";

afterEach(cleanup);

jest.mock("../../../api/client");

describe("Register a New User", () => {
  test("With all correct data", async () => {
    const testHistory = createMemoryHistory();

    const newUserData = {
      username: "TestUser",
      email: "testuser2@test.com",
      password: "123456",
      birthDate: "1992-01-01",
    };

    const responseMock = {
      success: true,
      jwtToken: "1",
      user: {
        description: "",
        webpage: "",
        id: 43,
        username: "TestUser",
        email: "testuser2@test.com",
        birthDate: "1992-01-01T00:00:00.000Z",
        updatedAt: "2024-03-18T12:07:41.483Z",
        createdAt: "2024-03-18T12:07:41.483Z",
      },
    };

    client.registerUser.mockResolvedValueOnce(responseMock);

    renderWithHistory(<LoginPage />, testHistory, "/");

    let createAccountButton = screen.getByText(/create account/i);
    expect(createAccountButton).toBeInTheDocument();

    userEvent.click(createAccountButton);

    let inputField = screen.getByLabelText(/name\*/i);
    expect(inputField).toBeInTheDocument();
    userEvent.type(inputField, newUserData.username);

    inputField = screen.getByLabelText(/email\*/i);
    userEvent.type(inputField, newUserData.email);

    inputField = screen.getByLabelText(/password\*/i);
    userEvent.type(inputField, newUserData.password);

    inputField = screen.getByLabelText(/date of birth\*/i);
    fireEvent.change(inputField, { target: { value: newUserData.birthDate } });

    let modalCreateAccountButton = screen.getAllByText(/create account/i)[1];
    userEvent.click(modalCreateAccountButton);

    await waitFor(() => {
      expect(testHistory.location.pathname).toBe("/home");
    });
  });

  test("With repeated user", async () => {
    const testHistory = createMemoryHistory();

    const newUserData = {
      username: "TestUser",
      email: "testuser2@test.com",
      password: "123456",
      birthDate: "1992-01-01",
    };

    const responseMock = {
      success: false,
      msg: "User already registered",
      err: 409,
    };

    client.registerUser.mockResolvedValueOnce(responseMock);

    renderWithHistory(<LoginPage />, testHistory, "/");

    let createAccountButton = screen.getByText(/create account/i);
    expect(createAccountButton).toBeInTheDocument();

    userEvent.click(createAccountButton);

    let inputField = screen.getByLabelText(/name\*/i);
    expect(inputField).toBeInTheDocument();
    userEvent.type(inputField, newUserData.username);

    inputField = screen.getByLabelText(/email\*/i);
    userEvent.type(inputField, newUserData.email);

    inputField = screen.getByLabelText(/password\*/i);
    userEvent.type(inputField, newUserData.password);

    inputField = screen.getByLabelText(/date of birth\*/i);
    fireEvent.change(inputField, { target: { value: newUserData.birthDate } });

    let modalCreateAccountButton = screen.getAllByText(/create account/i)[1];
    userEvent.click(modalCreateAccountButton);

    await waitFor(() => {
      let errMessage = screen.getByText(/User already registered/i);
      expect(errMessage).toBeInTheDocument();
    });
  });

  test("With server offline", async () => {
    const testHistory = createMemoryHistory();

    const newUserData = {
      username: "TestUser",
      email: "testuser2@test.com",
      password: "123456",
      birthDate: "1992-01-01",
    };

    client.registerUser.mockImplementationOnce(() => {
      throw new Error("NetworkError");
    });

    renderWithHistory(<LoginPage />, testHistory, "/");

    let createAccountButton = screen.getByText(/create account/i);
    expect(createAccountButton).toBeInTheDocument();

    userEvent.click(createAccountButton);

    let inputField = screen.getByLabelText(/name\*/i);
    expect(inputField).toBeInTheDocument();
    userEvent.type(inputField, newUserData.username);

    inputField = screen.getByLabelText(/email\*/i);
    userEvent.type(inputField, newUserData.email);

    inputField = screen.getByLabelText(/password\*/i);
    userEvent.type(inputField, newUserData.password);

    inputField = screen.getByLabelText(/date of birth\*/i);
    fireEvent.change(inputField, { target: { value: newUserData.birthDate } });

    let modalCreateAccountButton = screen.getAllByText(/create account/i)[1];
    userEvent.click(modalCreateAccountButton);

    await waitFor(() => {
      let errMessage = screen.getByText(
        /Sorry, there was an error. Please, try again later or contact the support./i
      );
      expect(errMessage).toBeInTheDocument();
    });
  });

  test("With form not filled", async () => {
    const testHistory = createMemoryHistory();

    const newUserData = {
      email: "testuser2@test.com",
      password: "123456",
      birthDate: "1992-01-01",
    };

    renderWithHistory(<LoginPage />, testHistory, "/");

    client.registerUser = jest.fn();

    let createAccountButton = screen.getByText(/create account/i);
    expect(createAccountButton).toBeInTheDocument();

    userEvent.click(createAccountButton);

    let inputField = screen.getByLabelText(/email\*/i);
    userEvent.type(inputField, newUserData.email);

    inputField = screen.getByLabelText(/password\*/i);
    userEvent.type(inputField, newUserData.password);

    inputField = screen.getByLabelText(/date of birth\*/i);
    fireEvent.change(inputField, { target: { value: newUserData.birthDate } });

    let modalCreateAccountButton = screen.getAllByText(/create account/i)[1];
    userEvent.click(modalCreateAccountButton);

    expect(client.registerUser).not.toHaveBeenCalled();
  });
});
