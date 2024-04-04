import React from "react";
import { render, screen } from "@testing-library/react";
import {
  toHaveClass,
  toHaveAttribute,
  toHaveStyle,
} from "@testing-library/jest-dom";
import AdButton from "../components/AdButton";

describe("AdButton", () => {
  it("renders the button with the correct props", () => {
    const props = {
      style: { color: "red" },
      image: "/public/assets/logo_mirastom.svg",
      link: "/some-link",
      title: "Button Title",
    };

    render(<AdButton {...props} />);

    // Проверяем, что кнопка отображается с заданным классом
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btn-light");

    // Проверяем, что изображение отображается с правильными свойствами
    const image = screen.getByAltText("dental_care");
    expect(image).toHaveAttribute("src", props.image);
    expect(image).toHaveAttribute("width", "50");
    expect(image).toHaveAttribute("height", "50");

    // Проверяем, что ссылка отображается с правильными свойствами
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", props.link);

    // Проверяем, что текст кнопки отображается правильно
    expect(link.textContent).toBe(props.title);
  });
});
