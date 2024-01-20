import { defineStore } from "pinia";
import useWindowResize from "@/utils/useWindowResize";

const screen = useWindowResize();
const minsize = 350
const lagsize = 500
export const globalSize = defineStore("globalSize", {
  state: () => {
    return {};
  },
  getters: {
    buttonSize(): string {
      if (screen.value < minsize) {
        return "x-small";
      } else if (screen.value < lagsize && screen.value > minsize) {
        return "small";
      } else {
        return "default";
      }
    },
    chipSize(): string {
      if (screen.value < minsize) {
        return "x-small";
      } else if (screen.value < lagsize && screen.value > minsize) {
        return "small";
      } else {
        return "default";
      }
    },
    avatarSize():number{
      if (screen.value < minsize) {
        return 60;
      } else if (screen.value < lagsize && screen.value > minsize) {
        return 70;
      } else {
        return 80;
      }
    },
    toolBtnSize():string|number {
      if (screen.value < minsize) {
        return '2rem';
      } else if (screen.value < lagsize && screen.value > minsize) {
        return '2.25rem';
      } else {
        return '2.5rem';
      }
    },
    toolBtnTextSize():string|number{
      if (screen.value < minsize) {
        return '1rem';
      } else if (screen.value < lagsize && screen.value > minsize) {
        return '1.25rem';
      } else {
        return '1.5rem';
      }
    },
    toolPSize():string|number{
      if (screen.value < minsize) {
        return '.5rem';
      } else if (screen.value < lagsize && screen.value > minsize) {
        return '.75rem';
      } else {
        return '1rem';
      }
    },
    vinputSize():string|number{
      if (screen.value < minsize) {
        return '.75rem';
      } else if (screen.value < lagsize && screen.value > minsize) {
        return '1.25rem';
      } else {
        return '1.5rem';
      }
    },
    transferBoxSize():string|number{
      if (screen.value < minsize) {
        return '6rem';
      } else if (screen.value < lagsize && screen.value > minsize) {
        return '10rem';
      } else {
        return '10rem';
      }
    }
  },
});
