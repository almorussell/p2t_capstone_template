import { create } from 'zustand';

export const useUserStore = create((set) => ({
  username: "",
  email: "",
  role: "user",
  loggedIn: false,
  userId: "",
  authSuccess: (data) => set({ username: data.username, email: data.email, role: data.role, loggedIn: true }
  ),
  logout: () => set({ user: null }),
  // loggedOut: () => set({ loggedIn: false }),
}));