import resolveColor from "./colors";

describe("resolveColor", () => {
  test("returns same var(...) string unchanged", () => {
    expect(resolveColor("var(--primary)")).toBe("var(--primary)");
  });

  test("wraps token name with var(--name)", () => {
    expect(resolveColor("primary")).toBe("var(--primary)");
    expect(resolveColor("secondary")).toBe("var(--secondary)");
  });

  test("returns non-string values as-is", () => {
    const obj = { a: 1 };
    expect(resolveColor(obj)).toBe(obj);
    expect(resolveColor(undefined)).toBeUndefined();
    expect(resolveColor(null)).toBeNull();
  });
});
