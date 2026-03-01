const KEY = "aigis_auth";

export const isAuthed = () => localStorage.getItem(KEY) === "true";

export const signIn = () => {
  localStorage.setItem(KEY, "true");
};

export const signOut = () => {
  localStorage.removeItem(KEY);
};