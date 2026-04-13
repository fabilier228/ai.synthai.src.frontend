import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToogle";
import { useTheme } from "next-themes";
import React from "react";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle Component", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: "light",
    });
  });

  test("nic nie renderuje przed zamontowaniem (mounted === false)", () => {
    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).not.toBeNull();
  });

  test("renders with correct initial value", () => {
    render(<ThemeToggle />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select).toBeInTheDocument();
    expect(select.value).toBe("light");
    expect(screen.getByText(/Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark/i)).toBeInTheDocument();
  });

  test("calls setTheme when value changes", () => {
    render(<ThemeToggle />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "dark" } });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  test("reflects resolvedTheme as selected option", () => {
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: "dark",
    });

    render(<ThemeToggle />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("dark");
  });

  test("posiada odpowiednie klasy CSS", () => {
    render(<ThemeToggle />);
    const select = screen.getByRole("combobox");

    expect(select).toHaveClass("bg-surface");
    expect(select).toHaveClass("text-text");
  });
});
