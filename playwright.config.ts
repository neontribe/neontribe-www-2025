// playwright.config.ts
// Drop this in your Astro project root if you don't already have one.
import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:4321";

export default defineConfig({
    // All test files live under ./tests
    testDir: "./tests",
    testMatch: "**/*.spec.{ts,js}",

    // Retry once on CI to smooth over flakiness
    retries: process.env.CI === "true" ? 1 : 0,
    workers: process.env.CI === "true" ? 2 : undefined,

    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },

    // Automatically start the Astro dev server when running inside Docker.
    // Remove this block if you're pointing BASE_URL at an already-running server.
    webServer: {
        command: "npm run dev -- --host 0.0.0.0",
        url: BASE_URL,
        reuseExistingServer: true,   // skip startup if server is already up
        timeout: 60_000,
        stdout: "pipe",
        stderr: "pipe",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        // Uncomment to add more browsers:
        // { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
        // { name: "webkit",   use: { ...devices["Desktop Safari"] }  },
    ],
});
