import { screen } from "@testing-library/react";
import LeftBar from "./LeftBar";

import { renderWithRedux } from "../../../testUtilities/renderWithProviders";
import mocker from "../../../testUtilities/mockers";

const mockedUser = mocker.mockUser();
const mockedUserSlice = mocker.mockInitialSlice({
  data: { user: mockedUser, jwtToken: 1 },
});
const initialState = mocker.mockInitialState({ user: mockedUserSlice });

describe("LeftBar rendering test", () => {
  test("Leftbar renders correctly", () => {
    renderWithRedux(<LeftBar />, { initialState });
    const leftBar = screen.getByTestId("LeftBar");
    expect(leftBar).toBeInTheDocument();
  });
});
