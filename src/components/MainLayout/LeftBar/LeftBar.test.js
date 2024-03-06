import { render, screen } from "@testing-library/react";
import LeftBar from "./LeftBar";

describe("LeftBar rendering test", () => {
  test("Leftbar renders correctly", () => {
    render(<LeftBar />);
    const leftBar = screen.getByTestId("LeftBar");
    expect(leftBar).toBeInTheDocument();
  });
});
