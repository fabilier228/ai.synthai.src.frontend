const mockPush = jest.fn();
const mockUseRouter = jest.fn(() => ({
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: "/",
  query: {},
}));

jest.mock("next/navigation", () => ({
  useRouter: mockUseRouter,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

export { mockUseRouter, mockPush };

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react");
    const { ...rest } = props || {};
    return React.createElement("img", rest);
  },
}));

jest.mock("@/contexts/AuthContext", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const openEmailSettings = jest.fn();
  const openPasswordSettings = jest.fn();
  const logout = jest.fn();
  const login = jest.fn();
  const register = jest.fn();
  const refreshUser = jest.fn();

  const useAuth = jest.fn(() => ({
    user: { sub: "test-user", name: "Test User", roles: [] },
    isAuthenticated: true,
    isLoading: false,
    login,
    register,
    logout,
    refreshUser,
    openEmailSettings,
    openPasswordSettings,
  }));

  return {
    __esModule: true,
    AuthProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useAuth,
  };
});

import "@testing-library/jest-dom";
import { JSX } from "react";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any),
);

jest.mock("@mui/icons-material", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const handler = new Proxy(
    {},
    {
      get: (
        target: Record<string, unknown>,
        prop: string | symbol,
      ): ((props: Record<string, unknown>) => JSX.Element) => {
        const name = String(prop);
        return (props: Record<string, unknown>) => {
          const testId = (props?.["data-testid"] as string) || `${name}Icon`;
          return React.createElement("svg", {
            "data-testid": testId,
            ...props,
          });
        };
      },
    },
  );
  return handler;
});

jest.mock("lucide-react", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const handler = new Proxy(
    {},
    {
      get: (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _target: Record<string, unknown>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _prop: string | symbol,
      ): ((props: Record<string, unknown>) => JSX.Element) => {
        return (props: Record<string, unknown>) => {
          const safeProps: Record<string, string | number | boolean> = {};
          for (const key in props || {}) {
            const val = props[key];
            if (typeof val === "boolean") safeProps[key] = String(val);
            else if (typeof val === "string" || typeof val === "number")
              safeProps[key] = val;
          }
          return React.createElement("svg", safeProps);
        };
      },
    },
  );
  return handler;
});
