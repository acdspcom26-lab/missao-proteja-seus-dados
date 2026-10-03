import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: true, workers: 3,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: [
    { command: 'npm run dev', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
    { command: 'npm run preview:prefix', url: 'http://127.0.0.1:4174/docs/', reuseExistingServer: !process.env.CI }
  ],
  projects: ['chromium', 'firefox', 'webkit'].map(browserName => ({ name: browserName, use: { browserName }, ...(browserName!=='chromium'?{testIgnore:/performance\.spec\.js/}:{}) }))
});
