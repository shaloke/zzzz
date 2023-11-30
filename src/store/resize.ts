import { defineStore } from "pinia";
import useWindowResize from "@/utils/useWindowResize";

const screen = useWindowResize();

export const globalSize = defineStore("globalSize", {
  state: () => {
    return {};
  },
  getters: {
    buttonSize(): string {
      if (screen.value < 350) {
        return "x-small";
      } else if (screen.value < 500 && screen.value > 350) {
        return "small";
      } else {
        return "default";
      }
    },
    chipSize(): string {
      if (screen.value < 350) {
        return "x-small";
      } else if (screen.value < 500 && screen.value > 350) {
        return "small";
      } else {
        return "default";
      }
    },
  },
});
