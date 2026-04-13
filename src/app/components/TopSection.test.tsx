import { render, screen, fireEvent } from "@testing-library/react";
import TopSection from "./TopSection";
import { useRouter } from "next/navigation";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("TopSection Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("renders main headings and texts", () => {
    render(<TopSection />);

    expect(
      screen.getByText(/Turn Any Audio Into Clear, Concise Insights/i),
    ).toBeInTheDocument();

    const statsTexts = screen.getAllByText(
      /Over 10,000 hours of audio transformed/i,
    );
    expect(statsTexts.length).toBeGreaterThan(0);
  });

  test("navigates to /flow when buttons are clicked (all instances)", () => {
    render(<TopSection />);

    const flowButtons = screen.getAllByRole("button", {
      name: /See our Process Flow/i,
    });

    flowButtons.forEach((btn) => {
      fireEvent.click(btn);
    });

    expect(mockPush).toHaveBeenCalledTimes(flowButtons.length);
    expect(mockPush).toHaveBeenCalledWith("/flow");
  });

  test("renders correct images for desktop and mobile versions", () => {
    render(<TopSection />);

    const desktopImg = screen.getByAltText("intro");
    const mobileImg = screen.getByAltText("Synthai intro");

    expect(desktopImg).toHaveAttribute("src", "/intro-desktop.png");
    expect(mobileImg).toHaveAttribute("src", "/intro-mobile.png");
  });

  test("checks visibility classes (key Tailwind classes)", () => {
    render(<TopSection />);

    const h1 = screen.getByText(/Turn Any Audio Into Clear, Concise Insights/i);
    const mobileContainer = screen
      .getByAltText("Synthai intro")
      .closest(".md\\:hidden");

    expect(h1).toHaveClass("hidden");
    expect(h1).toHaveClass("md:block");

    expect(mobileContainer).toBeInTheDocument();
  });
});
