import React, { useContext } from "react";
import ActionItem from "../components/action/ActionItem";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import { DataContext } from "@/store/GlobalState";

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
const mockDispatch = jest.fn();
const mockAction = {
  id: 1,
  title: "title1",
  info: "info1",
  image: [
    {
      url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697280928/test/ardn4nyyh7cjgt05amis.png",
      public_id: "test/ardn4nyyh7cjgt05amis",
    },
  ],
  timestamp: "2023-12-09 09:47:09",
};
jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: mockDispatch,
}));

describe("ActionItem", () => {
  it("renders correctly", () => {
    render(<DataContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
      <ActionItem action={mockAction} />
    </DataContext.Provider>);
    expect(screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText('info1')).toBeInTheDocument();
  });
  it('renders correctly admin links', ()=>{
    const mockButtonVision = true;
    const mockLasting = "2024-06-23";
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [mockLasting, jest.fn()])
      .mockImplementationOnce(() => [mockButtonVision, jest.fn()]);
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <ActionItem action={mockAction} />
      </DataContext.Provider>
    );
   const editButton = screen.getByText(/Редактировать/i);
   const deleteButton = screen.getByText(/Удалить/i);
   expect(editButton).toBeInTheDocument();
   expect(deleteButton).toBeInTheDocument();
   const lastingText = screen.getByText(/Акция закончится/i);
   expect(lastingText).toContainHTML("Акция закончится 2024-06-23");
  });

  it('not renders admin links', ()=>{
const mockButtonVision = false;
const mockLasting = "2024-06-23";
jest
  .spyOn(React, "useState")
  .mockImplementationOnce(() => [mockLasting, jest.fn()])
  .mockImplementationOnce(() => [mockButtonVision, jest.fn()]);
render(
  <DataContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
    <ActionItem action={mockAction} />
  </DataContext.Provider>
);
expect(screen.queryByText(/Редактировать/i)).toBeNull();
expect(screen.queryByText(/Удалить/i)).toBeNull();
  });
});
