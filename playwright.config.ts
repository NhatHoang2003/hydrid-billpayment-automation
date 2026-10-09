import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, process.env.ENV_FILE || '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : Number(process.env.API_RETRIES ?? 0),
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: process.env.CI ? 'never' : 'on-failure'
    }],
    ['allure-playwright', {
      resultsDir: 'allure-results'
    }]
  ],

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