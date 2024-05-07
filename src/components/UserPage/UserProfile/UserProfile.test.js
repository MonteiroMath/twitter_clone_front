import { act, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { renderWithRedux } from "../../../testUtilities/renderWithProviders";
import { client } from "../../../api/client";
import mocker from "../../../testUtilities/mockers";
import UserProfile from "./UserProfile";
/* 
  Write a test for user that is going to follow a user that is not followed yed

  Step order:
    - Render UserPage
    - verify that the follow button is on the screen
    - Verify the count of followers
    - Click on the follow button
    - Await for the follow button to become unfollow
    - Verify that the count of followers has increased by one

  what do I need to render the userPage?
    - jwtToken -> userData -> must set the user reducer store
*/

jest.mock("../../../api/client");
let mockedUser, followTestUser, initialState;

beforeAll(() => {
  mockedUser = mocker.mockUser();

  followTestUser = mocker.mockUser({ id: 2, username: "FollowTestUser" });

  initialState = mocker.mockInitialState({
    tweets: mocker.mockInitialSlice(),
    user: mocker.mockInitialSlice({
      data: { user: mockedUser, jwtToken: 1 },
    }),
  });
});

afterEach(cleanup);

describe("Follow tests", () => {
  test("Follow an user that wasn't followed before", async () => {
    //mock api response to getting the followTestUser data
    client.getUserData.mockResolvedValue({
      success: true,
      user: { ...followTestUser },
    });

    //mock api response to following the followTestUser
    client.follow.mockResolvedValue({
      success: true,
      user: {
        ...followTestUser,
        isFollowed: true,
        followersCount: followTestUser.followersCount + 1,
      },
    });

    renderWithRedux(
      <MemoryRouter initialEntries={[`/${followTestUser.username}`]}>
        <UserProfile user={followTestUser} />
      </MemoryRouter>,
      { initialState }
    );

    const followButton = await screen.findByRole("button", {
      name: /^follow$/i,
    });
    let followersCount = screen.getByTestId("followers-count");

    expect(followButton).toBeInTheDocument();
    expect(followersCount.textContent).toBe("0");

    userEvent.click(followButton);

    const unfollowButton = await screen.findByRole("button", {
      name: /^unfollow$/i,
    });

    expect(unfollowButton).toBeInTheDocument();
  });

  test("Unfollow an user that was followed before", async () => {
    //mock api response to getting the followTestUser data
    client.getUserData.mockResolvedValue({
      success: true,
      user: { ...followTestUser, isFollowed: true, followersCount: 1 },
    });

    //mock api response to following the followTestUser
    client.unfollow.mockResolvedValue({
      success: true,
      user: {
        ...followTestUser,
        isFollowed: false,
        followersCount: followTestUser.followersCount - 1,
      },
    });

    renderWithRedux(
      <MemoryRouter initialEntries={[`/${followTestUser.username}`]}>
        <UserProfile user={followTestUser} />
      </MemoryRouter>,
      { initialState }
    );

    const unfollowButton = await screen.findByRole("button", {
      name: /^unfollow$/i,
    });
    let followersCount = screen.getByTestId("followers-count");

    expect(unfollowButton).toBeInTheDocument();
    expect(followersCount.textContent).toBe("1");

    userEvent.click(unfollowButton);

    
    const followButton = await screen.findByRole("button", {
      name: /^follow$/i,
    });

    expect(followButton).toBeInTheDocument();
    
  });
});
