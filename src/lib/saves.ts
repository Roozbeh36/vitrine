import { create } from "zustand";
import { persist } from "zustand/middleware";

type Saves = {
  ids: string[];
  toggle: (id: string) => void;
};

export const useSaves = create<Saves>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        set({
          ids: ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids],
        });
      },
    }),
    { name: "vitrine-saves" },
  ),
);
