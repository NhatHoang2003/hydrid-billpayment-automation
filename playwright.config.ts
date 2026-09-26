import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, process.env.ENV_FILE || '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : Number(process.env.API_RETRIES ?? 0),
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.API_BASE_URL ?? 'https://billpay-api.gauravkhurana-practice-api.workers.dev',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api',
      testDir: './tests',
      testMatch: /.*\/api\/.*\.spec\.ts/,
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\/ui\/.*\.spec\.ts/,
    },
  ],
});