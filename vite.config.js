import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // or "@vitejs/plugin-react" if you're not using SWC

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/", 
  };

  if (command !== "serve") {
    config.base = "/dashboard-on720.com/"; 
  }

  return config;
});
