import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

const useAuth = require("@/contexts/AuthContext").useAuth;

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useParams: () => ({ id: "42" }),
}));

describe("TranscriptViewContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays word count from wordCount property", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "Test",
        transcript: "One two three",
        wordCount: 99,
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Word count:/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/99 words/)).toBeInTheDocument();
  });

  test("calculates word count from transcription text", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "Test",
        transcript: "Speaker 1: Hello world from tests",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Word count:/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/4 words/)).toBeInTheDocument();
  });

  test("shows error when detail fetch fails", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ transcriptions: [] }),
      })
      .mockRejectedValueOnce(new Error("boom"));

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch transcript details./i),
      ).toBeInTheDocument(),
    );
  });

  test("renders SONG summary when showSummary clicked", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const summaryObj = {
      title: "S",
      artist: "A",
      genre: "G",
      themes: ["t1", "t2"],
      interpretation: "i",
    };
    const detailResp = {
      transcription: {
        id: "42",
        title: "SongTitle",
        transcript: "text",
        summary: JSON.stringify(summaryObj),
        category: "song",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Show Summary/i)).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByText(/Show Summary/i));

    await waitFor(() =>
      expect(screen.getByText(/Title:/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/Artist:/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/i)).toBeInTheDocument();
  });

  test("SONG summary uses transcription title when summary lacks title and falls back for artist/genre/emotions", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const summaryObj = {
      artist: undefined,
      genre: undefined,
      emotions: ["joy"],
    };
    const detailResp = {
      transcription: {
        id: "42",
        title: "FromTransTitle",
        transcript: "text",
        summary: JSON.stringify(summaryObj),
        category: "song",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /FromTransTitle/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Show Summary/i));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /AI Summary/i }),
      ).toBeInTheDocument(),
    );

    const fromTransTitleElements = screen.getAllByText(/FromTransTitle/);
    const summaryFromTransTitle = fromTransTitleElements.find(
      (el) =>
        el.textContent?.includes("Title:") ||
        el.parentElement?.textContent?.includes("Title:"),
    );
    expect(summaryFromTransTitle).toBeInTheDocument();

    expect(screen.getByText(/Unknown/)).toBeInTheDocument();
    expect(screen.getByText(/—/)).toBeInTheDocument();
    expect(screen.getByText(/joy/)).toBeInTheDocument();
  });

  test("SONG summary shows empty title when neither summary nor transcription provide it", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: undefined,
        transcript: "text",
        summary: JSON.stringify({}),
        category: "song",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.queryByText(/Show Summary/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Show Summary/i));

    await waitFor(() =>
      expect(screen.getByText(/Title:/i)).toBeInTheDocument(),
    );
    const titleEl = screen.getByText(/Title:/i);
    expect(titleEl.textContent?.trim()).toBe("Title:");
  });

  test("download summary creates object URL", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "Doc",
        transcript: "text",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp })
      .mockResolvedValueOnce({ ok: true, blob: async () => new Blob(["x"]) });

    if (!(window.URL as any).createObjectURL) {
      (window.URL as any).createObjectURL = jest
        .fn()
        .mockReturnValue("blob:fake");
      (window.URL as any).revokeObjectURL = jest.fn();
    }
    const createSpy = jest.spyOn(window.URL as any, "createObjectURL");
    const revokeSpy = jest.spyOn(window.URL as any, "revokeObjectURL");

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Download PDF/i)).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByText(/Download PDF/i));

    await waitFor(() => expect(createSpy).toHaveBeenCalled());

    createSpy.mockRestore();
    revokeSpy.mockRestore();
  });

  test("delete confirmation leads to navigation on success", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "ToDel",
        transcript: "text",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp })
      .mockResolvedValueOnce({ ok: true }); // delete

    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(true);

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Delete/i)).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByText(/^Delete$/i));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/transcripts"));

    confirmSpy.mockRestore();
  });

  test("returns 0 when no transcription and no wordCount", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "Empty",
        transcript: "",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Word count:/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/0 words/)).toBeInTheDocument();
  });

  test("handles missing transcriptId gracefully", async () => {
    const nav = require("next/navigation");
    const originalUseParams = nav.useParams;
    nav.useParams = () => ({});

    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByText(/Transcript with ID\s*not found/i),
      ).toBeInTheDocument(),
    );

    nav.useParams = originalUseParams;
  });

  test("does not fetch list when user.sub is missing", async () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: true,
      isLoading: false,
    });

    const detailResp = {
      transcription: {
        id: "42",
        title: "OnlyDetail",
        transcript: "a b c",
        summary: "{}",
      },
    };

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });
    (global.fetch as unknown as jest.Mock) = fetchMock;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /OnlyDetail/i }),
      ).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("renders transcripts from list mapping when toggled", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = {
      transcriptions: [
        { id: "10", title: "T10" },
        { id: "11", title: "T11" },
      ],
    };
    const detailResp = {
      transcription: {
        id: "42",
        title: "HasList",
        transcript: "text",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /HasList/i }),
      ).toBeInTheDocument(),
    );
    const titleEls = screen.getAllByText(/HasList/i);
    fireEvent.click(titleEls[0]);

    await waitFor(() => expect(screen.getByText(/T10/)).toBeInTheDocument());
    expect(screen.getByText(/T11/)).toBeInTheDocument();
  });

  test("alerts when delete fails", async () => {
    useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResp = { transcriptions: [] };
    const detailResp = {
      transcription: {
        id: "42",
        title: "ToFail",
        transcript: "text",
        summary: "{}",
      },
    };

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResp })
      .mockResolvedValueOnce({ ok: true, json: async () => detailResp })
      .mockResolvedValueOnce({ ok: false }); // delete fails

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(true);

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Delete/i)).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByText(/^Delete$/i));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith("Failed to delete transcript."),
    );

    alertSpy.mockRestore();
    confirmSpy.mockRestore();
  });

  describe("renderSummary variants", () => {
    const renderWithSummary = async (
      category: string,
      summaryObj: any,
      expectedTexts: string[],
    ) => {
      useAuth.mockReturnValue({
        user: { sub: "u1" },
        isAuthenticated: true,
        isLoading: false,
      });
      const listResp = { transcriptions: [] };
      const detailResp = {
        transcription: {
          id: "42",
          title: "S",
          transcript: "text",
          summary: JSON.stringify(summaryObj),
          category,
        },
      };

      (global.fetch as jest.Mock) = jest
        .fn()
        .mockResolvedValueOnce({ ok: true, json: async () => listResp })
        .mockResolvedValueOnce({ ok: true, json: async () => detailResp });

      const Page = require("./page").default;
      render(<Page />);

      await waitFor(() =>
        expect(screen.getByText(/Show Summary/i)).toBeInTheDocument(),
      );
      fireEvent.click(screen.getByText(/Show Summary/i));

      for (const txt of expectedTexts) {
        await waitFor(() =>
          expect(screen.getByText(new RegExp(txt))).toBeInTheDocument(),
        );
      }
    };

    test("LECTURE summary renders expected fields", async () => {
      await renderWithSummary(
        "lecture",
        {
          title: "L",
          speaker: "Dr X",
          fieldOfStudy: "CS",
          topics: ["t1", "t2"],
          summary: "sum",
          keyQuotes: ["q1"],
          conclusion: "end",
        },
        ["Speaker:", "Field:", "Topics:", "Conclusion:"],
      );
    });

    test("AUDIOBOOK summary renders expected fields", async () => {
      await renderWithSummary(
        "audiobook",
        {
          title: "B",
          author: "A",
          narrator: "N",
          plotSummary: "plot",
          mainCharacters: ["c1"],
          themes: ["th"],
        },
        [
          "Author:",
          "Narrator:",
          "Plot summary:",
          "Main characters:|Key Characters:",
        ],
      );
    });

    test("CONVERSATION summary renders expected fields", async () => {
      await renderWithSummary(
        "conversation",
        {
          participants: ["p1", "p2"],
          topics: ["t"],
          summary: "s",
          agreementOutcome: "ok",
          keyQuotes: ["k"],
        },
        ["Participants:", "Topics:", "Outcome:|Outcomes:"],
      );
    });

    test("default summary renders JSON", async () => {
      await renderWithSummary("other", { foo: "bar" }, ['"foo": "bar"']);
    });
  });
});
