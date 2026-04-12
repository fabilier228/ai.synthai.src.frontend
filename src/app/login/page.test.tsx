import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { useAuth } = require("@/contexts/AuthContext");

describe("Login page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state when isLoading is true", () => {
    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: true,
      login: jest.fn(),
    });
    const LoginPage = require("./page").default;
    render(<LoginPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects to /profile when already authenticated", async () => {
    const mockPush = jest.fn();
    const nav = require("next/navigation");
    nav.useRouter = () => ({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValueOnce({
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
    });
    const LoginPage = require("./page").default;
    render(<LoginPage />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/profile"));
  });

  test("clicking Sign in with Keycloak calls login", async () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: false,
      login: loginMock,
    });
    const LoginPage = require("./page").default;

    render(<LoginPage />);
    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: /Sign in with Keycloak/i }),
    );
    expect(loginMock).toHaveBeenCalled();
  });

  test("clicking Create an account navigates to /register", async () => {
    const mockPush = jest.fn();
    const nav = require("next/navigation");
    nav.useRouter = () => ({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
    });
    const LoginPage = require("./page").default;
    render(<LoginPage />);

    const createBtn = screen.getByRole("button", {
      name: /Create an account/i,
    });
    fireEvent.click(createBtn);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});
