import { describe, expect, it } from "vitest";
import { createItem, deleteItem, toggleItem } from "./items";

describe("demo domain", () => {
  it("creates, checks, and deletes without mutating inputs", () => {
    const initial = createItem([], "  Try the demo  ", "one");
    expect(initial).toEqual([
      { id: "one", title: "Try the demo", completed: false },
    ]);
    const checked = toggleItem(initial, "one");
    expect(checked[0]?.completed).toBe(true);
    expect(initial[0]?.completed).toBe(false);
    expect(toggleItem(checked, "one")).toEqual(initial);
    expect(deleteItem(checked, "one")).toEqual([]);
    expect(deleteItem(initial, "missing")).toEqual(initial);
  });

  it("rejects invalid titles and IDs", () => {
    for (const title of ["", "   ", "a".repeat(121)]) {
      expect(() => createItem([], title, "one")).toThrow();
    }
    expect(() => createItem([], "Valid", "")).toThrow();
    const items = createItem([], "Valid", "one");
    expect(() => createItem(items, "Duplicate", "one")).toThrow();
    expect(createItem([], "a".repeat(120), "one")).toHaveLength(1);
  });
});
