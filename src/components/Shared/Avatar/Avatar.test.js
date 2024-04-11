import { render, screen, cleanup } from "@testing-library/react";

import Avatar from "./Avatar";

afterEach(cleanup);

describe("Avatar", () => {
  test("Render avatar without props", () => {
    render(<Avatar />);

    expect(screen.getByAltText(/User avatar/)).toBeInTheDocument();
  });
});
