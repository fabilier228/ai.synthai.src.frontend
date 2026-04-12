import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./page";

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: {
    getUserProfile: jest.fn().mockResolvedValue({
      preferred_username: "jdoe",
      name: "John Doe",
      email: "jdoe@example.com",
      email_verified: true,
      registration_date: Date.now(),
      last_login: new Date().toISOString(),
    }),
  },
}));

describe("Profile page", () => {
  test("shows loading state when profile is loading", () => {
    const { useAuth } = require("@/contexts/AuthContext");
    useAuth.mockReturnValueOnce({ isAuthenticated: false, isLoading: true });

    render(<Profile />);
    expect(screen.getByText(/Loading profile.../i)).toBeInTheDocument();
  });

  test("renders user info and allows switching tabs", async () => {
    render(<Profile />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { level: 1, name: /jdoe/i }),
      ).toBeInTheDocument(),
    );

    expect(
      screen.getByRole("heading", { name: /My Account/i }),
    ).toBeInTheDocument();

    const user = userEvent.setup();
    const settingsBtn = screen.getByRole("button", { name: /Settings/i });
    await user.click(settingsBtn);

    expect(screen.getByText(/Account Management/i)).toBeInTheDocument();
  });
});
