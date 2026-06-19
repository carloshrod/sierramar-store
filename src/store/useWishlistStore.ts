import { create } from "zustand";

interface WishlistState {
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  isWishlistOpen: false,
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
}));
