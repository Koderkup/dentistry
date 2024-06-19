import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Carousel from "../components/Carousel";
import {
  toHaveClass,
  toHaveAttribute,
  toHaveStyle,
} from "@testing-library/jest-dom";
describe("Carouse", () => {
  const mockedChildren = () => (
    <div className="carousel-inner">
      <div data-testid="itm1"></div>
      <div data-testid="itm2"></div>
      <div data-testid="itm3"></div>
    </div>
  );
  it("renders correctly", () => {
    render(<Carousel children={mockedChildren()} />);
    expect(screen.getByTestId("itm1")).toBeInTheDocument();
    expect(screen.getByTestId("itm2")).toBeInTheDocument();
    expect(screen.getByTestId("itm3")).toBeInTheDocument();
  });
});
