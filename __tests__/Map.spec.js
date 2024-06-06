import Map from "@/components/Map";
import { render, screen } from "@testing-library/react";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
describe("Map", () => {
  it("it should be in the document", () => {
    render(<Map />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });
});
