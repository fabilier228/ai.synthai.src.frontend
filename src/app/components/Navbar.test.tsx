import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "./Navbar";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

global.fetch = jest.fn();

describe("Navbar - Complete coverage of router.push and color styling", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/");

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        transcriptions: [{ id: "101", title: "Meeting Alpha" }, { id: "102" }],
      }),
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  const setup = async (path = "/") => {
    (usePathname as jest.Mock).mockReturnValue(path);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderResult: any;
    await act(async () => {
      renderResult = render(<Navbar />);
    });
    return renderResult;
  };

  test("Desktop: All text buttons call router.push", async () => {
    await setup();
    const links = [
      { label: "Home", route: "/" },
      { label: "Process Flow", route: "/flow" },
      { label: "Add new", route: "/add_new" },
      { label: "Profile", route: "/profile" },
      { label: "Transcripts", route: "/transcripts" },
    ];

    links.forEach(({ label, route }) => {
      const btn = screen.getByRole("button", {
        name: new RegExp(`^${label}$`, "i"),
      });
      fireEvent.click(btn);
      expect(mockPush).toHaveBeenCalledWith(route);
    });
  });

  test("Mobile: All navigation icons call router.push", async () => {
    await setup();

    const icons = [
      { testId: "HomeFilledIcon", route: "/" },
      { testId: "ModelTrainingIcon", route: "/flow" },
      { testId: "AddCircleOutlineIcon", route: "/add_new" },
      { testId: "LocalLibraryIcon", route: "/transcripts" },
      { testId: "PersonIcon", route: "/profile" },
    ];

    icons.forEach(({ testId, route }) => {
      const icon = screen.getByTestId(testId);
      const btn = icon.closest("button")!;
      fireEvent.click(btn);
      expect(mockPush).toHaveBeenCalledWith(route);
    });
  });

  test("Desktop: Clicking specific transcript from list calls router.push", async () => {
    await setup();
    const toggleBtn = screen.getByTestId("ExpandMoreIcon").parentElement!;
    fireEvent.click(toggleBtn);

    const transcriptBtn = screen.getByText("Meeting Alpha");
    fireEvent.click(transcriptBtn);
    expect(mockPush).toHaveBeenCalledWith("/transcripts/101");
  });

  test("Desktop: Assigns text-primary class to active button and muted to others", async () => {
    await setup("/flow");

    const flowBtn = screen.getByRole("button", { name: /process flow/i });
    const homeBtn = screen.getByRole("button", { name: /home/i });

    expect(flowBtn).toHaveClass("text-primary");
    expect(homeBtn).toHaveClass("text-primary_muted");
  });

  test("Mobile: Nadaje klasę text-primary aktywnej ikonie", async () => {
    await setup("/profile");

    const activeIcon = screen.getByTestId("PersonIcon");
    const inactiveIcon = screen.getByTestId("HomeFilledIcon");

    expect(activeIcon).toHaveClass("text-primary");
    expect(inactiveIcon).toHaveClass("text-primary_muted");
  });

  test("Transcripts section: Highlights parent (text-primary) when subpage is active", async () => {
    await setup("/transcripts/101");

    const desktopParent = screen.getByText("Transcripts").closest("div")!;
    expect(desktopParent).toHaveClass("text-primary");
    const mobileIcon = screen.getByTestId("LocalLibraryIcon");
    expect(mobileIcon).toHaveClass("text-primary");
  });

  test("Lista Transkrypcji: Podświetla tylko aktywny element na liście (linia 214)", async () => {
    await setup("/transcripts/101");

    const activeItem = screen.getByRole("button", { name: /meeting alpha/i });
    const inactiveItem = screen.getByRole("button", {
      name: /transcript 102/i,
    });

    expect(activeItem).toHaveClass("text-primary");
    expect(inactiveItem).toHaveClass("text-primary_muted");
  });

  test("Automatically expands list when path is /transcripts/*", async () => {
    await setup("/transcripts/anything");
    expect(screen.getByTestId("ExpandLessIcon")).toBeInTheDocument();
    expect(screen.getByText("Meeting Alpha")).toBeInTheDocument();
  });

  test("Toggles expansion state when arrow icon is clicked", async () => {
    await setup("/");
    const toggleBtn = screen.getByTestId("ExpandMoreIcon").parentElement!;

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("ExpandLessIcon")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("ExpandMoreIcon")).toBeInTheDocument();
  });

  test("Polling: Ponawia zapytanie fetch co 5 sekund", async () => {
    await setup();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
