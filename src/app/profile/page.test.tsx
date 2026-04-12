import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import Profile, { formatDate, getStatusColor } from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return React.createElement("img", { src: props.src, alt: props.alt });
  },
}));

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const authMock = jest.fn();
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => authMock(),
}));

const getUserProfileMock = jest.fn();
jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { getUserProfile: () => getUserProfileMock() },
}));

jest.mock(
  "./MyAccount",
  () => () => React.createElement("div", null, "MyAccountMock"),
);
jest.mock(
  "./AccountManagement",
  () => () => React.createElement("div", null, "AccountManagementMock"),
);
jest.mock(
  "./Security",
  () => () => React.createElement("div", null, "SecurityMock"),
);

describe("Profile page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  test("shows loading state when auth is loading", () => {
    authMock.mockReturnValue({ isAuthenticated: false, isLoading: true });

    render(React.createElement(Profile));

    expect(screen.getByText(/Loading profile.../i)).toBeInTheDocument();
  });

  test("redirects to login when not authenticated", async () => {
    authMock.mockReturnValue({ isAuthenticated: false, isLoading: false });

    await act(async () => {
      render(React.createElement(Profile));
    });

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });

  test("renders profile when authenticated and profile fetched", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });

    const fakeProfile = {
      preferred_username: "jdoe",
      sub: "user-1",
      name: "John Doe",
      given_name: "John",
      family_name: "Doe",
      email: "jdoe@example.com",
      email_verified: true,
      registration_date: Date.now(),
      last_login: Date.now(),
    };

    getUserProfileMock.mockResolvedValueOnce(fakeProfile);

    render(React.createElement(Profile));

    await waitFor(() => expect(screen.getByText("jdoe")).toBeInTheDocument());
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jdoe@example.com")).toBeInTheDocument();

    expect(screen.getByText("My Account")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  test("switching tabs shows corresponding content", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });

    getUserProfileMock.mockResolvedValueOnce({ preferred_username: "jdoe" });

    render(React.createElement(Profile));

    await waitFor(() => expect(screen.getByText("jdoe")).toBeInTheDocument());

    expect(screen.getByText("MyAccountMock")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Security"));

    await waitFor(() =>
      expect(screen.getByText("SecurityMock")).toBeInTheDocument(),
    );
  });

  test("loads avatar from localStorage when present", async () => {
    const saved = "data:image/png;base64,SAVED_AVATAR";
    window.localStorage.setItem("userAvatar", saved);

    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(null);

    render(React.createElement(Profile));

    await waitFor(() =>
      expect(screen.getByAltText("Profile Avatar")).toHaveAttribute(
        "src",
        saved,
      ),
    );
  });

  test("upload avatar preview, save and persist to localStorage", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(null);

    const mockDataUrl = "data:image/png;base64,MOCK";
    const OriginalFileReader = (global as any).FileReader;
    class MockFileReader {
      onload: any = null;
      readAsDataURL(_: any) {
        if (this.onload) this.onload({ target: { result: mockDataUrl } });
      }
    }
    (global as any).FileReader = MockFileReader;

    const { container } = render(React.createElement(Profile));

    await waitFor(() =>
      expect(screen.getByText(/My Account/i)).toBeInTheDocument(),
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["a"], "avatar.png", { type: "image/png" });

    act(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() =>
      expect(screen.getByText(/Preview your new avatar:/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() =>
      expect(screen.getByAltText("Profile Avatar")).toHaveAttribute(
        "src",
        mockDataUrl,
      ),
    );
    expect(window.localStorage.getItem("userAvatar")).toBe(mockDataUrl);

    (global as any).FileReader = OriginalFileReader;
  });

  test("cancel avatar preview clears preview and input value", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(null);

    const mockDataUrl = "data:image/png;base64,MOCK2";
    const OriginalFileReader = (global as any).FileReader;
    class MockFileReader {
      onload: any = null;
      readAsDataURL(_: any) {
        if (this.onload) this.onload({ target: { result: mockDataUrl } });
      }
    }
    (global as any).FileReader = MockFileReader;

    const { container } = render(React.createElement(Profile));

    await waitFor(() =>
      expect(screen.getByText(/My Account/i)).toBeInTheDocument(),
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["a"], "avatar.png", { type: "image/png" });

    act(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() =>
      expect(screen.getByText(/Preview your new avatar:/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() =>
      expect(
        screen.queryByText(/Preview your new avatar:/i),
      ).not.toBeInTheDocument(),
    );
    expect(
      (container.querySelector('input[type="file"]') as HTMLInputElement).value,
    ).toBe("");

    (global as any).FileReader = OriginalFileReader;
  });

  test("remove avatar resets to default and clears localStorage after saving an uploaded avatar", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(null);

    const mockDataUrl = "data:image/png;base64,TO_REMOVE";
    const OriginalFileReader = (global as any).FileReader;
    class MockFileReader {
      onload: any = null;
      readAsDataURL(_: any) {
        if (this.onload) this.onload({ target: { result: mockDataUrl } });
      }
    }
    (global as any).FileReader = MockFileReader;

    const { container } = render(React.createElement(Profile));

    await waitFor(() =>
      expect(screen.getByText(/My Account/i)).toBeInTheDocument(),
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["a"], "avatar.png", { type: "image/png" });

    act(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() =>
      expect(screen.getByText(/Preview your new avatar:/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() =>
      expect(window.localStorage.getItem("userAvatar")).toBe(mockDataUrl),
    );

    const removeBtn = screen.getByTitle("Remove Avatar");
    fireEvent.click(removeBtn);

    await waitFor(() =>
      expect(window.localStorage.getItem("userAvatar")).toBeNull(),
    );

    (global as any).FileReader = OriginalFileReader;
  });

  describe("formatDate utility", () => {
    test("parses numeric timestamp", () => {
      const ts = Date.now();
      const out = formatDate(ts);
      expect(typeof out).toBe("string");
      expect(out).not.toBe("N/A");
    });

    test("parses numeric string timestamp", () => {
      const ts = String(Date.now());
      const out = formatDate(ts);
      expect(typeof out).toBe("string");
      expect(out).not.toBe("N/A");
    });

    test("parses ISO string", () => {
      const iso = new Date().toISOString();
      const out = formatDate(iso);
      expect(typeof out).toBe("string");
      expect(out).not.toBe("N/A");
    });

    test("returns N/A for invalid strings", () => {
      expect(formatDate("not-a-date")).toBe("N/A");
      expect(formatDate("")).toBe("N/A");
    });
  });

  describe("getStatusColor utility", () => {
    test("returns correct class for statuses", () => {
      expect(getStatusColor("Active")).toBe("text-success");
      expect(getStatusColor("Premium")).toBe("text-warning");
      expect(getStatusColor("Email Unverified")).toBe("text-error");
      expect(getStatusColor("Other")).toBe("text-text");
    });
  });

  test("handleAvatarClick triggers input click", async () => {
    const fakeProfile = {
      preferred_username: "testuser",
      sub: "user-1",
      name: "Test User",
      email: "test@example.com",
      email_verified: true,
    };
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(fakeProfile);

    const clickSpy = jest.spyOn(HTMLInputElement.prototype, "click");
    render(React.createElement(Profile));

    await waitFor(() =>
      expect(screen.getByText(/My Account/i)).toBeInTheDocument(),
    );

    const changeBtn = screen.getByTitle("Change Avatar");
    fireEvent.click(changeBtn);

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  test("file change validation: non-image and oversize files alert", async () => {
    authMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    getUserProfileMock.mockResolvedValueOnce(null);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { container } = render(React.createElement(Profile));
    await waitFor(() =>
      expect(screen.getByText(/My Account/i)).toBeInTheDocument(),
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const txtFile = new File(["a"], "file.txt", { type: "text/plain" });
    act(() => {
      fireEvent.change(input, { target: { files: [txtFile] } });
    });
    expect(alertSpy).toHaveBeenCalledWith("Please select an image file");

    alertSpy.mockClear();

    const bigFile = new File(["a"], "big.png", { type: "image/png" });
    Object.defineProperty(bigFile, "size", { value: 6 * 1024 * 1024 });
    act(() => {
      fireEvent.change(input, { target: { files: [bigFile] } });
    });
    expect(alertSpy).toHaveBeenCalledWith("File size must be less than 5MB");

    alertSpy.mockRestore();
  });
});
