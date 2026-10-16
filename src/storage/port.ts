import type { DemoItem } from "../domain/items";

export interface DemoStore {
  load(): Promise<DemoItem[]>;
  save(items: readonly DemoItem[]): Promise<void>;
  reset(): Promise<void>;
}
