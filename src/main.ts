import { mount } from "./ui.js";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("#app not found");
mount(root);
