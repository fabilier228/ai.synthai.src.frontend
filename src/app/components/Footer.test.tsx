import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Footer Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("renders Synthai 2025 text", () => {
    render(<Footer />);
    const copyrightElements = screen.getAllByText(/Synthai 2025/i);
    expect(copyrightElements.length).toBeGreaterThan(0);
  });

  test("navigates to all subpages in both versions (Mobile and Desktop)", () => {
    render(<Footer />);

    const navigationCases = [
      { name: /home/i, path: "/" },
      { name: /flow/i, path: "/models" },
      { name: /add new/i, path: "/add_new" },
      { name: /transcripts/i, path: "/transcripts" },
      { name: /profile/i, path: "/profile" },
    ];

    navigationCases.forEach(({ name, path }) => {
      const buttons = screen.getAllByRole("button", { name });

      buttons.forEach((btn) => {
        fireEvent.click(btn);
        expect(mockPush).toHaveBeenCalledWith(path);
      });
    });
  });

  test("all buttons have bg-transparent class", () => {
    render(<Footer />);
    const allButtons = screen.getAllByRole("button");

    allButtons.forEach((btn) => {
      if (btn.textContent !== "Synthai 2025") {
        expect(btn).toHaveClass("bg-transparent");
      }
    });
  });
});
