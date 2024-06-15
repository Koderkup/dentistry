import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import About from "@/pages/about";
import { toHaveClass } from "@testing-library/jest-dom";
describe("About", () => {
  it("renders correctly", () => {
    render(<About />);
    expect(
      screen.getByText("Здоровье Ваших зубов начинается здесь!")
    ).toBeInTheDocument();
    expect(screen.getByText("Клиника «МираСтом»")).toBeInTheDocument();
    expect(screen.getByText("СТОМАТОЛОГИЯ")).toBeInTheDocument();
    expect(screen.getByText("ПРЕМИАЛЬНОГО КЛАССА")).toBeInTheDocument();
    const image = screen.getByAltText("clinica");
    expect(image).toBeInTheDocument();
    const anouncement = screen.getAllByAltText("about");
    expect(anouncement).toHaveLength(3);
    expect(screen.getByTestId('about')).toBeInTheDocument();
  });
});
