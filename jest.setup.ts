jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const React = require("react");
    const { priority, fill, jsx, ...rest } = props || {};
    return React.createElement("img", rest);
  },
}));

jest.mock("@/contexts/AuthContext", () => {
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
    AuthProvider: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    useAuth,
  };
});

import "@testing-library/jest-dom";

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
  }),
);

jest.mock("@mui/icons-material", () => {
  const React = require("react");
  const handler = new Proxy(
    {},
    {
      get: (target, prop) => {
        const name = String(prop);
        return (props: any) => {
          const testId = props?.['data-testid'] || `${name}Icon`;
          return React.createElement('svg', { 'data-testid': testId, ...props });
        };
      },
    },
  );
  return handler;
});

jest.mock("lucide-react", () => {
  const React = require("react");
  const handler = new Proxy(
    {},
    {
      get: (target, prop) => {
        return (props: any) => {
          const safeProps: Record<string, any> = {};
          for (const key in props || {}) {
            const val = props[key];
            if (typeof val === 'boolean') safeProps[key] = String(val);
            else safeProps[key] = val;
          }
          return React.createElement('svg', safeProps);
        };
      },
    },
  );
  return handler;
});
