import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DoctorPerson from "../components/doctor/DoctorPerson";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";

const mockState = {
  notify: {},
  auth: {
    user: {
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
const dispatch = jest.fn();
const mockDoctorProps = {
  id: 1,
  sirname: "Doctor",
  fullname: "Dent Dentin",
  proff: "dentist",
  avatar: [{ url: "/image1.jpg" }],
};
const mockDispatch = jest.spyOn(React, "useContext").mockReturnValue(dispatch);
jest
  .spyOn(React, "useContext")
  .mockImplementation(() => ({ state: mockState, dispatch: mockDispatch }));
describe("DoctorPerson", () => {
  it("should render component without errors", () => {
    const { container } = render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <DoctorPerson doctor={mockDoctorProps} />
      </DataContext.Provider>
    );
    expect(container).toBeInTheDocument();
  });
  it("should render component with admin role", () => {
    const { container } = render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <DoctorPerson doctor={mockDoctorProps} />
      </DataContext.Provider>
    );
    const adminLink = screen.getByRole("link");
    expect(adminLink).toHaveAttribute("href", "/doctors/create/1");
    const deletBtn = screen.getByRole("button");
    expect(deletBtn).toBeInTheDocument();
    fireEvent.click(deletBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
