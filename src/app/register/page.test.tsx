import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const { useAuth } = require("@/contexts/AuthContext");

describe("Register page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading when auth is loading", async () => {
    useAuth.mockReturnValue({ isLoading: true, isAuthenticated: false });

    const Page = require("./page").default;
    render(<Page />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects / does not render when authenticated", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument(),
    );
  });

  test("renders features and buttons; sign up calls register; sign in navigates", async () => {
    const register = jest.fn();
    const nav = require("next/navigation");
    const pushMock = jest.fn();
    nav.useRouter = () => ({
      push: pushMock,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      register,
    });

    const Page = require("./page").default;
    render(<Page />);

    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

    const signupBtn = screen.getByRole("button", {
      name: /Sign up with Keycloak/i,
    });
    fireEvent.click(signupBtn);
    expect(register).toHaveBeenCalled();

    const signinBtn = screen.getByRole("button", { name: /Sign in instead/i });
    fireEvent.click(signinBtn);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
