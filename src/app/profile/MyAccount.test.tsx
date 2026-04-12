import React from "react";
import { render, screen } from "@testing-library/react";
import MyAccount from "./MyAccount";

describe("MyAccount component", () => {
  test("renders registration date and last login from props", () => {
    const userData = {
      registrationDate: "01.01.2025, 12:00",
      lastLogin: "02.02.2025, 13:30",
    };

    render(<MyAccount userData={userData} />);

    expect(screen.getByText(/Registration Date/i)).toBeInTheDocument();
    expect(screen.getByText(userData.registrationDate)).toBeInTheDocument();
    expect(screen.getByText(/Last Login/i)).toBeInTheDocument();
    expect(screen.getByText(userData.lastLogin)).toBeInTheDocument();
  });
});
