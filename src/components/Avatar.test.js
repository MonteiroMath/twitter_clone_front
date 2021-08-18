import { render, screen, cleanup } from "@testing-library/react";

import Avatar from "./Avatar";

afterEach(cleanup);

describe("Avatar", () => {
  test("Render avatar without props", () => {
    render(<Avatar />);

    expect(screen.getByAltText(/User avatar/)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/)).toHaveAttribute("width", "50px");
  });

  test("Render avatar with size prop", () => {
    let size = "100px";

    render(<Avatar size={size} />);

    expect(screen.getByAltText(/User avatar/)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/)).toHaveAttribute("width", size);
  });
});
