import React from "react";
import ServiceItem from "../components/service/ServiceItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
const mockState = {
  notify: {},
  auth: {},
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
const mockService = {
  id: 1,
  title: "Терапевтическая стоматология",
  intro: "Главной задачей ортопедической стоматологии",
  image: [
    {
      url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1703681438/test/terapy_vkfxru.png",
      public_id: "test/terapy_vkfxru",
    },
  ],
  description:
    "Согласно статистике, около 70% беременных женщин не посещают стоматолога. ",
};
const dispatch = jest.fn();
const mockDispatch = jest.spyOn(React, "useContext").mockReturnValue(dispatch); 
jest
  .spyOn(React, "useContext")
  .mockImplementation(() => ({ state: mockState, dispatch: mockDispatch }));
describe("ServiceItem", () => {
  test("should render element", () => {
    render(<DataContext.Provider value={{state: mockState, dispatch: mockDispatch}}>
        <ServiceItem service={mockService} />
    </DataContext.Provider>);
    expect(screen.getByText(/Терапевтическая стоматология/i)).toBeInTheDocument();
    expect(screen.getByText(/Главной задачей ортопедической стоматологии/i)).toBeInTheDocument();
    expect(screen.getByAltText("service`s photo")).toBeInTheDocument();
  });
});

