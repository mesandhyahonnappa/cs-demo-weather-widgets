import { Plugin } from "vue";
import { setPlatformHelpers } from "@stencil/core";

const toKebabCase = (eventName: string) =>
  eventName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

// ael = addEventListener
// rel = removeEventListener
// ce = CustomEvent (used when emitting from a component)
const getHelperFunctions = () => {
  return {
    ael: (el: any, eventName: string, cb: any, opts: any) =>
      el.addEventListener(toKebabCase(eventName), cb, opts),
    rel: (el: any, eventName: string, cb: any, opts: any) =>
      el.removeEventListener(toKebabCase(eventName), cb, opts),
    ce: (eventName: string, opts: any) =>
      new CustomEvent(toKebabCase(eventName), opts),
  };
};

export const ComponentLibrary: Plugin = {
  async install() {
    const params = getHelperFunctions();
    setPlatformHelpers(params);
  },
};
