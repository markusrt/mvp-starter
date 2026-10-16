import { z } from "zod";
import type { DemoStore } from "./port";

export const STORAGE_KEY = "mvp-starter:demo:v1";

const stateSchema = z
  .object({
    version: z.literal(1),
    items: z
      .array(
        z
          .object({
            id: z.string().trim().min(1),
            title: z.string().trim().min(1).max(120),
            completed: z.boolean(),
          })
          .strict(),
      )
      .refine(
        (items) => new Set(items.map((item) => item.id)).size === items.length,
      ),
  })
  .strict();

type StorageAccess = () => Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function createBrowserStore(
  access: StorageAccess = () => window.localStorage,
): DemoStore {
  return {
    async load() {
      let raw: string | null;
      try {
        raw = access().getItem(STORAGE_KEY);
      } catch {
        throw new Error(
          "Cannot read browser storage. Allow site storage and retry. No data was changed.",
        );
      }
      if (raw === null) return [];
      try {
        return stateSchema.parse(JSON.parse(raw)).items;
      } catch {
        throw new Error(
          "Demo data is malformed or from an unsupported version. It has been preserved. Retry or deliberately reset the demo.",
        );
      }
    },
    async save(items) {
      const state = stateSchema.parse({ version: 1, items });
      try {
        access().setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        throw new Error(
          "Not saved: browser storage is unavailable or full. Your last saved data is unchanged. Allow storage or free space, then try again.",
        );
      }
    },
    async reset() {
      try {
        access().removeItem(STORAGE_KEY);
      } catch {
        throw new Error(
          "Reset failed: browser storage is unavailable. Try again.",
        );
      }
    },
  };
}
