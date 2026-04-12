import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as AuthContext from "@/contexts/AuthContext";
import RegisterPage from "./page";

describe("Register page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading when auth is loading", async () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({
        isLoading: true, isAuthenticated: false,
        user: null,
        login: function (): void {
          throw new Error("Function not implemented.");
        },
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
    render(<RegisterPage />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects / does not render when authenticated", async () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({
        isAuthenticated: true, isLoading: false,
        user: null,
        login: function (): void {
          throw new Error("Function not implemented.");
        },
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
    render(<RegisterPage />);

    await waitFor(() =>
      expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument(),
    );
  });

  test("renders features and buttons; sign up calls register; sign in navigates", async () => {
    const register = jest.fn();
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      register,
      user: null,
      login: function (): void {
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
    render(<RegisterPage />);

    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

    const signupBtn = screen.getByRole("button", {
      name: /Sign up with Keycloak/i,
    });
    fireEvent.click(signupBtn);
    expect(register).toHaveBeenCalled();

    const signinBtn = screen.getByRole("button", { name: /Sign in instead/i });
    fireEvent.click(signinBtn);
    // Push is handled by the globally mocked useRouter from jest.setup.ts
  });
});
