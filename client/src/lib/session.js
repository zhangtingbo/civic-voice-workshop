const SESSION_STORAGE_KEY = "civic-voice-session";

export function restoreSession(storage = window.localStorage) {
  try {
    const storedSession = storage.getItem(SESSION_STORAGE_KEY);
    if (!storedSession) return null;

    const session = JSON.parse(storedSession);
    return session?.user?.role ? session : null;
  } catch {
    return null;
  }
}

export function persistSession(session, storage = window.localStorage) {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(storage = window.localStorage) {
  storage.removeItem(SESSION_STORAGE_KEY);
}
