import Contacts from "../pages/contacts/index";
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
import {
  toHaveClass,
  toHaveAttribute,
  toHaveStyle,
} from "@testing-library/jest-dom";
import useDeviceTypeDetect  from "../hooks/useDeviceTypeDetect";
jest.mock("../hooks/useDeviceTypeDetect");
describe("Contacts", () => {
  it("renders correctly adress", () => {
    useDeviceTypeDetect.mockReturnValue({ isDesktop: false });
    render(<Contacts />);
    expect(screen.getByText("Контактная информация")).toBeInTheDocument();
    expect(
      screen.getByText("Адрес: г. Витебск, ул. Фрунзе, 81/1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Телефон: +375 (29) 813-86-90")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Электронная почта: mirastom2023@gmail.by")
    ).toBeInTheDocument();
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });
  it("first slide has class active", () => {
     useDeviceTypeDetect.mockReturnValue({ isDesktop: false });
    render(<Contacts />);
    const carouselItems = screen.getAllByTestId("carousel-item");
    expect(carouselItems.length).toBe(3);
    expect(carouselItems[0]).toHaveClass("active");
  });
  it("icons have to be rendered correctly", () => {
    useDeviceTypeDetect.mockReturnValue({ isDesktop: true });
    render(<Contacts />);
    expect(screen.queryByTestId('carouse-item')).not.toBeInTheDocument();
    expect(screen.getByTestId("line-item")).toBeInTheDocument();
    const PiEyeThins = screen.getAllByTestId("PiEyeThin");
    expect(PiEyeThins.length).toBe(3);
    expect(screen.queryByTestId("PiEyeSlashThin")).not.toBeInTheDocument();
    fireEvent.click(PiEyeThins[0]);
    expect(screen.queryByTestId("PiEyeSlashThin")).toBeInTheDocument();
  });
});
