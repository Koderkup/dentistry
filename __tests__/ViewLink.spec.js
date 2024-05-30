import ViewLink from "@/components/ViewLink";
import { render, screen } from "@testing-library/react";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";

describe("ViewLink", () => {
  const mockUrl = "https://example.com";
  it("renders a link with the correct class", () => {
    render(<ViewLink url={mockUrl} />);
    const viewBtn = screen.getByRole("link");
    expect(viewBtn).toHaveClass("btn");
    expect(viewBtn).toHaveAttribute("href", mockUrl);
  });
});
