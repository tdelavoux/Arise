//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

//default options
const options = {
//   ...flexSearchIndexOptions,
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [SearchPlugin(options)],
});