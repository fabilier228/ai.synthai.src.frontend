import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountManagement from "./AccountManagement";

const openEmailSettings = jest.fn();
const openPasswordSettings = jest.fn();
const logout = jest.fn();

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    openEmailSettings,
    openPasswordSettings,
    logout,
  }),
}));

describe("AccountManagement component", () => {
  test("calls auth actions when buttons are clicked", () => {
    render(<AccountManagement />);

    const changeEmailBtn = screen.getByRole("button", {
      name: /Change Email/i,
    });
    fireEvent.click(changeEmailBtn);
    expect(openEmailSettings).toHaveBeenCalled();

    const changePasswordBtn = screen.getByRole("button", {
      name: /Change Password/i,
    });
    fireEvent.click(changePasswordBtn);
    expect(openPasswordSettings).toHaveBeenCalled();

    const logoutBtn = screen.getByRole("button", { name: /Log Out/i });
    fireEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalled();
  });
});
