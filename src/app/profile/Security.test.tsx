import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Security from "./Security";

describe("Security component", () => {
  test("renders headings and session info", () => {
    render(<Security />);

    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Active Sessions")).toBeInTheDocument();
    expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();

    expect(screen.getByText("Current Session")).toBeInTheDocument();
    expect(screen.getByText(/Windows · Chrome · New York/)).toBeInTheDocument();

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("enable 2FA button is visible and clickable", () => {
    render(<Security />);

    const btn = screen.getByRole("button", { name: /Enable 2FA/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(
      screen.getByRole("button", { name: /Enable 2FA/i }),
    ).toBeInTheDocument();
  });
});
