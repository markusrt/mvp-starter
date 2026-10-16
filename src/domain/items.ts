export interface DemoItem {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
}

export function createItem(
  items: readonly DemoItem[],
  title: string,
  id: string,
): DemoItem[] {
  const trimmed = title.trim();
  if (!trimmed || trimmed.length > 120) {
    throw new Error("Enter a title between 1 and 120 characters.");
  }
  if (!id.trim() || items.some((item) => item.id === id)) {
    throw new Error("Item IDs must be non-empty and unique.");
  }
  return [...items, { id, title: trimmed, completed: false }];
}

export function toggleItem(items: readonly DemoItem[], id: string): DemoItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item,
  );
}

export function deleteItem(items: readonly DemoItem[], id: string): DemoItem[] {
  return items.filter((item) => item.id !== id);
}
