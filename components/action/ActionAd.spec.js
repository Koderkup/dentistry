import React, { useContext } from "react";
import ActionAd from "./ActionAd";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import { DataContext } from "@/store/GlobalState";
import OffsetContent from "../OffsetContent";

describe("ActionAd", () => {
  const mockWidgets = [
    { type: "type1", title: "Title 1", text: "Text 1" },
    { type: "type1", title: "Title 2", text: "Text 2" },
    { type: "type2", title: "Title 3", text: "Text 3" },
    { type: "type2", title: "Title 4", text: "Text 4" },
  ];

  const mockState = {
    notify: {},
    auth: {
      user: {
        name: "user",
        password: "password",
        email: "exampl@mail.com",
        role: "admin",
      },
    },
    modal: {},
    services: [],
    users: [],
    doctors: [],
    articles: [],
    filtered_articles: [],
    actions: [],
    reviews: [],
    widgets: [],
  };

  const mockList = [
    {
      id: 1,
      type: "insurerance",
      title: "Страховая компания 'Белнефтестрах",
      widgetURL: "https://i.postimg.cc/d3HQksyc/belneftestrah.png",
    },
  ];
  jest.spyOn(React, "useContext").mockImplementation(() => ({
    state: mockState,
    dispatch: jest.fn(),
  }));

  test("renders ActionAd component", () => {
    act(() => {
      render(
        <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
          <ActionAd widgets={mockWidgets}></ActionAd>
        </DataContext.Provider>
      );
    });
    const actionImage = screen.getByAltText("action-ad");
    expect(actionImage).toBeInTheDocument();
    const offsetContent = screen.getByTestId("offset");
    expect(offsetContent).toBeInTheDocument();
    const eyeImages = screen.getAllByAltText("eye");
    expect(eyeImages.length).toBe(2);
  });
  test('should link  navigating to the "/create-widget" page ', () => {
    jest.mock("next/router", () => ({
      useRouter: jest.fn(),
    }));
    const mockedRouter = {
      push: jest.fn(),
    };
    act(() => {
      render(
        <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
          <ActionAd widgets={mockWidgets}></ActionAd>
        </DataContext.Provider>
      );
    });
    const plusLink = screen.getByRole("link", { name: "plus" });
    expect(plusLink).toBeInTheDocument();
    expect(plusLink).toHaveAttribute("href", "/create-widget");
  });
  });

