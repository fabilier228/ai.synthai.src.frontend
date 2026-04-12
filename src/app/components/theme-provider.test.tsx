import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./theme-provider";
import React from "react";

jest.mock("next-themes", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ThemeProvider: ({ children, attribute, defaultTheme }: any) => (
    <div
      data-testid="next-themes-provider"
      data-attribute={attribute}
      data-theme={defaultTheme}
    >
      {children}
    </div>
  ),
}));

describe("ThemeProvider Component", () => {
  test("renders children inside provider", () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Content</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("passes default attributes to NextThemesProvider", () => {
    render(
      <ThemeProvider>
        <span>Test</span>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toHaveAttribute("data-attribute", "class");
    expect(provider).toHaveAttribute("data-theme", "system");
  });

  test("allows overriding default props", () => {
    render(
      <ThemeProvider defaultTheme="dark" attribute="data-theme">
        <span>Test</span>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toHaveAttribute("data-attribute", "data-theme");
    expect(provider).toHaveAttribute("data-theme", "dark");
  });
});
