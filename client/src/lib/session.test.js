import { describe, expect, it } from "vitest";
import { clearSession, persistSession, restoreSession } from "./session";

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

describe("session storage", () => {
  it("restores a persisted session and clears it on sign out", () => {
    const storage = createStorage();
    const session = { user: { name: "Aisha Rahman", nric: "S0000001A", role: "citizen" } };

    persistSession(session, storage);
    expect(restoreSession(storage)).toEqual(session);

    clearSession(storage);
    expect(restoreSession(storage)).toBeNull();
  });

  it("ignores invalid stored data", () => {
    const storage = createStorage();
    storage.setItem("civic-voice-session", "not JSON");

    expect(restoreSession(storage)).toBeNull();
  });
});
