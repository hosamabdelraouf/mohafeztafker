import type { Config } from "@react-router/dev/config";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basename = isGithubPages ? "/mohafeztafker" : "/";

export default {
  appDirectory: "app",
  basename,
  ssr: true,
  splitRouteModules: false,
  routeDiscovery: { mode: "initial" },
  async prerender() {
    return ["/"];
  },
} satisfies Config;
