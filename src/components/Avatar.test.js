import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

/*

- Avatar should render with the size prop value for width and height
  - If the prop is not informed, it should render with 50px
- Avatar should render the image informed in the src property
  - If no prop is informed, it should fallback to the default value
*/


//
test("renders avatar link", () => {
  render(<Avatar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});