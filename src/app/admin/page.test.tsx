import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const { useAuth } = require("@/contexts/AuthContext");

describe("Admin page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows access denied when user is not admin", async () => {
    useAuth.mockReturnValue({
      user: { roles: [] },
      isAuthenticated: true,
      isLoading: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    expect(
      screen.getByText(/Access Denied. Admin role required./i),
    ).toBeInTheDocument();
  });

  test("renders users list and deletes a user", async () => {
    const nav = require("next/navigation");
    const push = jest.fn();
    nav.useRouter = () => ({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    (global as any).confirm = jest.fn(() => true);

    const usersList = [
      {
        id: "u1",
        username: "john",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        enabled: true,
        createdTimestamp: Date.now(),
      },
    ];

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => usersList })
      .mockResolvedValueOnce({ ok: true });

    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/^john$/i)).toBeInTheDocument(),
    );

    const delBtn = screen.getByText(/Delete/i);
    fireEvent.click(delBtn);

    await waitFor(() =>
      expect(screen.queryByText(/^john$/i)).not.toBeInTheDocument(),
    );

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/u1"),
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  test("shows loading while fetching users", async () => {
    let resolveFetch;
    const deferred = new Promise((res) => {
      resolveFetch = res;
    });

    const mockFetch = jest.fn().mockReturnValue(deferred);
    (global.fetch as jest.Mock) = mockFetch;

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();

    resolveFetch({ ok: true, json: async () => [] });

    await waitFor(() =>
      expect(screen.queryByText(/Loading users.../i)).not.toBeInTheDocument(),
    );
  });

  test("fetch users failure shows error", async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    (global.fetch as jest.Mock) = mockFetch;

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Failed to load users/i)).toBeInTheDocument(),
    );
  });

  test("delete canceled by confirm leaves user intact", async () => {
    const nav = require("next/navigation");
    nav.useRouter = () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    (global as any).confirm = jest.fn(() => false);

    const usersList = [
      {
        id: "u2",
        username: "alice",
        firstName: "Alice",
        lastName: "A",
        email: "a@ex.com",
        enabled: true,
        createdTimestamp: Date.now(),
      },
    ];
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => usersList });
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/^alice$/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Delete/i));

    expect(screen.getByText(/^alice$/i)).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("delete non-ok shows alert and keeps user", async () => {
    const nav = require("next/navigation");
    nav.useRouter = () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    (global as any).confirm = jest.fn(() => true);
    window.alert = jest.fn();

    const usersList = [
      {
        id: "u3",
        username: "bob",
        firstName: "Bob",
        lastName: "B",
        email: "b@ex.com",
        enabled: true,
        createdTimestamp: Date.now(),
      },
    ];
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => usersList })
      .mockResolvedValueOnce({ ok: false });
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/^bob$/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Failed to delete user"),
    );
    expect(screen.getByText(/^bob$/i)).toBeInTheDocument();
  });

  test("delete fetch throws shows alert and keeps user", async () => {
    const nav = require("next/navigation");
    nav.useRouter = () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    (global as any).confirm = jest.fn(() => true);
    window.alert = jest.fn();

    const usersList = [
      {
        id: "u4",
        username: "carol",
        firstName: "Carol",
        lastName: "C",
        email: "c@ex.com",
        enabled: true,
        createdTimestamp: Date.now(),
      },
    ];
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => usersList })
      .mockRejectedValueOnce(new Error("network"));
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/^carol$/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Error deleting user"),
    );
    expect(screen.getByText(/^carol$/i)).toBeInTheDocument();
  });

  test("access denied when user is undefined", async () => {
    useAuth.mockReturnValue({
      user: undefined,
      isAuthenticated: true,
      isLoading: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    expect(
      screen.getByText(/Access Denied. Admin role required./i),
    ).toBeInTheDocument();
  });

  test("access denied when user.roles is undefined", async () => {
    useAuth.mockReturnValue({
      user: { roles: undefined },
      isAuthenticated: true,
      isLoading: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    expect(
      screen.getByText(/Access Denied. Admin role required./i),
    ).toBeInTheDocument();
  });

  test("shows Disabled badge and red classes when user is disabled", async () => {
    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    const usersList = [
      {
        id: "u5",
        username: "dave",
        firstName: "Dave",
        lastName: "D",
        email: "d@ex.com",
        enabled: false,
        createdTimestamp: Date.now(),
      },
    ];
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => usersList });
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/^dave$/i)).toBeInTheDocument(),
    );

    const badge = screen.getByText(/Disabled/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  test("handles response shaped as { users: [...] }", async () => {
    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    const data = {
      users: [
        {
          id: "u6",
          username: "ellen",
          firstName: "Ellen",
          lastName: "E",
          email: "e@ex.com",
          enabled: true,
          createdTimestamp: Date.now(),
        },
      ],
    };
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => data });
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/^ellen$/i)).toBeInTheDocument(),
    );
  });

  test("handles response with no users property -> empty list", async () => {
    useAuth.mockReturnValue({
      user: { roles: ["admin"] },
      isAuthenticated: true,
      isLoading: false,
    });

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    const { container } = render(<Page />);

    await waitFor(() =>
      expect(container.querySelectorAll("tbody tr").length).toBe(0),
    );
  });
});
