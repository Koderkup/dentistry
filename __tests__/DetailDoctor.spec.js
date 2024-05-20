import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DetailDoctor from "@/pages/doctors/[id]";
import {
  toHaveClass,
  toHaveAttribute,
  toHaveStyle,
} from "@testing-library/jest-dom";

describe("DetailDoctor", () => {
  const mockDoctor = {
    sirname: "Smith",
    fullname: "John Smith",
    proff: "Dentist",
    avatar: [{ url: "https://example.com/avatar.jpg" }],
    description: "This is a description of the doctor.",
  };

  it("should render the doctor's information correctly", () => {
    render(<DetailDoctor doctor={[mockDoctor]} />);
    expect(screen.getByAltText("mirastom")).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.sirname)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.fullname)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.proff)).toBeInTheDocument();
    expect(
      screen.getByAltText("https://example.com/avatar.jpg")
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a description of the doctor.")
    ).toBeInTheDocument();
  });

  it("check the visibility of additional information", () => {
    render(<DetailDoctor doctor={[mockDoctor]} />);
    const additionalInfo1 = screen.getByText(
      "Команда квалифицированных специалистов"
    );
    const additionalInfo2 = screen.getByText("3 стоматологических кабинета");
    const additionalInfo3 = screen.getByText("Удобное расположение");
    expect(additionalInfo1).toBeInTheDocument();
    expect(additionalInfo2).toBeInTheDocument();
    expect(additionalInfo3).toBeInTheDocument();
  });
});
