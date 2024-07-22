import {
  NITROPACK_HOME_URL,
  NITROPACK_SITE_ID,
  NITROPACK_SITE_SECRET,
} from "./nitropack-config.js";

export function initializeNitropack() {
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "/libs/nitropack/nitropack-sdk.js"; // Adjust the path if necessary
    script.onload = () => {
      if (window.nitropack) {
        window.nitropack.initialize({
          homeUrl: NITROPACK_HOME_URL,
          siteId: NITROPACK_SITE_ID,
          siteSecret: NITROPACK_SITE_SECRET,
        });
      }
    };
    document.head.appendChild(script);
  }
}
