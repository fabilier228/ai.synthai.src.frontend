import { render, screen } from "@testing-library/react";
import Header from "./Header";
import React from "react";

describe("Header Component", () => {
  test("renders Synthai logo in mobile version", () => {
    render(<Header />);
    const logoText = screen.getByText(/Synthai/i);
    expect(logoText).toBeInTheDocument();

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toContainElement(logoText);
  });

  test("has correct semantic structure (header and aside)", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const aside = screen.getByRole("complementary", { hidden: true });
    expect(aside).toBeInTheDocument();
  });

  test("header has correct positioning classes", () => {
    render(<Header />);
    const header = screen.getByRole("banner");

    expect(header).toHaveClass("fixed");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("z-[101]");
  });

  test("aside has desktop sidebar classes", () => {
    render(<Header />);
    const aside = screen.getByRole("complementary", { hidden: true });

    expect(aside).toHaveClass("w-64");
    expect(aside).toHaveClass("h-screen");
    expect(aside).toHaveClass("lg:flex");
  });
});
