import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as AuthContext from "@/contexts/AuthContext";
import * as navigationModule from "next/navigation";
import LoginPage from "./page";

describe("Login page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state when isLoading is true", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: true,
      login: jest.fn(),
      user: null,
      register: function (): void {
        throw new Error("Function not implemented.");
      },
      logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      refreshUser: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      openEmailSettings: function (): void {
        throw new Error("Function not implemented.");
      },
      openPasswordSettings: function (): void {
        throw new Error("Function not implemented.");
      }
    });

    render(<LoginPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects to /profile when already authenticated", async () => {
    const mockPush = jest.fn();
    jest.spyOn(navigationModule, "useRouter").mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    jest.spyOn(AuthContext, "useAuth").mockReturnValueOnce({
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      user: null,
      register: function (): void {
        throw new Error("Function not implemented.");
      },
      logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      refreshUser: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      openEmailSettings: function (): void {
        throw new Error("Function not implemented.");
      },
      openPasswordSettings: function (): void {
        throw new Error("Function not implemented.");
      }
    });

    render(<LoginPage />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/profile"));
  });

  test("clicking Sign in with Keycloak calls login", async () => {
    const loginMock = jest.fn();
    jest.spyOn(AuthContext, "useAuth").mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: false,
      login: loginMock,
      user: null,
      register: function (): void {
        throw new Error("Function not implemented.");
      },
      logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      refreshUser: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      openEmailSettings: function (): void {
        throw new Error("Function not implemented.");
      },
      openPasswordSettings: function (): void {
        throw new Error("Function not implemented.");
      }
    });

    render(<LoginPage />);
    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: /Sign in with Keycloak/i }),
    );
    expect(loginMock).toHaveBeenCalled();
  });

  test("clicking Create an account navigates to /register", async () => {
    const mockPush = jest.fn();
    jest.spyOn(navigationModule, "useRouter").mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    jest.spyOn(AuthContext, "useAuth").mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: false,
      login: jest.fn(),
      user: null,
      register: function (): void {
        throw new Error("Function not implemented.");
      },
      logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      refreshUser: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      openEmailSettings: function (): void {
        throw new Error("Function not implemented.");
      },
      openPasswordSettings: function (): void {
        throw new Error("Function not implemented.");
      }
    });

    render(<LoginPage />);

    const createBtn = screen.getByRole("button", {
      name: /Create an account/i,
    });
    fireEvent.click(createBtn);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});
