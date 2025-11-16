export const getLocalStorageItem = <T = any>(item: string): T | null => {
  const stored = localStorage.getItem(item);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as T;
  } catch {
    // Invalid JSON
    return null;
  }
};

export const setLocalStorageItem = (item: string, data: unknown) => {
  localStorage.setItem(item, JSON.stringify(data));
};

export const loadState = () => {
  try {
    const serialized = localStorage.getItem('appState');
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error('[ERROR]: loadState for localStorage failed. ', err);
    return;
  }
};

export const saveState = (state: unknown) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('appState', serialized);
  } catch (err) {
    console.error('[ERROR]: saveState for localStorage failed. ', err);
    return;
  }
};
