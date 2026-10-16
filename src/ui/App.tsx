import { useEffect, useRef, useState } from "react";
import {
  createItem,
  type DemoItem,
  deleteItem,
  toggleItem,
} from "../domain/items";
import type { DemoStore } from "../storage/port";

export function App({ store }: { store: DemoStore }) {
  const [items, setItems] = useState<DemoItem[]>([]);
  const [title, setTitle] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const locked = useRef(false);
  const input = useRef<HTMLInputElement>(null);

  async function load() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setReady(false);
    setError("");
    setNotice("");
    try {
      setItems(await store.load());
      setReady(true);
      setNotice("Demo loaded from this browser.");
    } catch (cause) {
      setError(message(cause));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  // The injected store is stable for the lifetime of the application.
  // biome-ignore lint/correctness/useExhaustiveDependencies: initial load only
  useEffect(() => {
    void load();
  }, []);

  async function save(next: () => DemoItem[], after?: () => void) {
    if (locked.current || !ready) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const updated = next();
      await store.save(updated);
      setItems(updated);
      setNotice("Saved in this browser.");
      after?.();
    } catch (cause) {
      setError(message(cause));
    } finally {
      locked.current = false;
      setBusy(false);
      input.current?.focus();
    }
  }

  async function reset() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await store.reset();
      setItems([]);
      setTitle("");
      setReady(true);
      setConfirmReset(false);
      setNotice("Demo data reset. Other site storage was not changed.");
    } catch (cause) {
      setError(message(cause));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  return (
    <main>
      <header>
        <p className="eyebrow">Reusable starter · demo only</p>
        <h1>A small idea, saved locally.</h1>
        <p>
          Create, check, and delete sample items to try the harness. This is not
          your product yet.
        </p>
      </header>
      <section aria-labelledby="demo-heading" aria-busy={busy}>
        <h2 id="demo-heading">Demo items</h2>
        <p>
          Discardable sample data only. No account, server, or backup. Use this
          browser and origin to return to your items.
        </p>
        <p role="status">{busy ? "Working…" : notice}</p>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        {!ready && !busy && (
          <button type="button" onClick={() => void load()}>
            Retry loading
          </button>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void save(
              () => createItem(items, title, crypto.randomUUID()),
              () => setTitle(""),
            );
          }}
        >
          <label htmlFor="title">New demo item</label>
          <div className="entry">
            <input
              ref={input}
              id="title"
              value={title}
              maxLength={120}
              required
              disabled={!ready || busy}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button disabled={!ready || busy || !title.trim()} type="submit">
              Add item
            </button>
          </div>
        </form>
        {ready && items.length === 0 && (
          <p>No demo items yet. Add one above to begin.</p>
        )}
        {ready && (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <label className="item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    disabled={busy}
                    onChange={() => void save(() => toggleItem(items, item.id))}
                  />
                  <span className={item.completed ? "completed" : ""}>
                    {item.title}
                  </span>
                </label>
                <button
                  type="button"
                  disabled={busy}
                  aria-label={`Delete ${item.title}`}
                  onClick={() => void save(() => deleteItem(items, item.id))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>
        {confirmReset ? (
          <div>
            <p>
              Delete all demo items from this browser? This cannot be undone.
            </p>
            <button type="button" disabled={busy} onClick={() => void reset()}>
              Confirm reset demo
            </button>{" "}
            <button
              type="button"
              disabled={busy}
              onClick={() => setConfirmReset(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirmReset(true)}
          >
            Reset demo data
          </button>
        )}
        <p>
          Local persistence does not guarantee offline page loading. Review the
          project docs before building your own idea.
        </p>
      </footer>
    </main>
  );
}

function message(cause: unknown): string {
  return cause instanceof Error
    ? cause.message
    : "Unexpected failure. Please retry.";
}
