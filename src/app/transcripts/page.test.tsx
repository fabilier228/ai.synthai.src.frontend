import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Use global useAuth mock from jest.setup
import * as AuthContext from "@/contexts/AuthContext";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("AllTranscriptsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows empty state when no transcripts", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
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

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transcriptions: [] }),
    });

    const { default: Page } = await import("./page");
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/No transcripts found/i)).toBeInTheDocument(),
    );
  });

  test("renders transcripts and deletes one on delete click", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
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

    const listResponse = {
      transcriptions: [{ id: 1, title: "Meeting Alpha" }],
    };

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse })
      .mockResolvedValueOnce({ ok: true });

    (global.fetch as jest.Mock) = mockFetch;

    const { default: Page } = await import("./page");
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Alpha/i)).toBeInTheDocument(),
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() =>
      expect(screen.queryByText(/Meeting Alpha/i)).not.toBeInTheDocument(),
    );

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/transcriptions/1"),
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  test("shows alert when delete fails", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
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

    const listResponse = { transcriptions: [{ id: 2, title: "Meeting Beta" }] };

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse })
      .mockResolvedValueOnce({ ok: false });

    (global.fetch as jest.Mock) = mockFetch;

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { default: Page } = await import("./page");
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Beta/i)).toBeInTheDocument(),
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith("Failed to delete transcript."),
    );

    alertSpy.mockRestore();
  });

  test("shows error when fetching transcripts fails", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
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

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockRejectedValueOnce(new Error("network"));

    const { default: Page } = await import("./page");
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch transcripts./i),
      ).toBeInTheDocument(),
    );
  });

  test("does not fetch when user.sub is missing", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: {
        sub: ""
      },
      isAuthenticated: true,
      isLoading: false,
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

    const fetchSpy = jest.fn();
    (global.fetch as jest.Mock) = fetchSpy;

    const { default: Page } = await import("./page");
    render(<Page />);
    
    await new Promise((r) => setTimeout(r, 20));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("navigates to transcript detail on click", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
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

    const listResponse = {
      transcriptions: [{ id: 3, title: "Meeting Gamma" }],
    };
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse });

    const { default: Page } = await import("./page");
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Gamma/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Meeting Gamma/i));

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining("/transcripts/3"),
    );
  });
});
