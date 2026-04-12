import { render, screen } from "@testing-library/react";
import UseCasesSection from "./UseCasesSection";
import React from "react";

describe("UseCasesSection Component", () => {
  test("renders Use Cases section heading", () => {
    render(<UseCasesSection />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /use cases/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders list (ul) as container for use cases", () => {
    render(<UseCasesSection />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("bg-surface", "rounded-2xl");
  });

  test("displays all defined use cases", () => {
    render(<UseCasesSection />);

    const expectedTexts = [
      /For Students/i,
      /For Professionals/i,
      /For Creators/i,
      /For Anyone/i,
    ];

    expectedTexts.forEach((pattern) => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });
  });

  test("renders correct number of list items (li)", () => {
    render(<UseCasesSection />);
    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(4);
  });

  test("each list item contains bullet point with correct color", () => {
    render(<UseCasesSection />);
    const bullets = screen.getAllByText("•");

    expect(bullets).toHaveLength(4);
    bullets.forEach((bullet) => {
      expect(bullet).toHaveClass("text-secondary");
    });
  });
});
