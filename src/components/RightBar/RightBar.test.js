import { render, screen } from "@testing-library/react";
import RightBar from "./RightBar";

describe("RightBar rendering test", () => {
  test("Rightbar renders correctly", () => {
    render(<RightBar />);
    const rightBar = screen.getByTestId("RightBar");
    expect(rightBar).toBeInTheDocument();
  });
});
