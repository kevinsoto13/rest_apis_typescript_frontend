import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173', // 👈 base de tu app
    headless: true,                   // cambia a false si querés ver el navegador
    screenshot: 'only-on-failure',    // saca captura si falla
    video: 'retain-on-failure',       // graba video si falla
    trace: 'on-first-retry',          // traza de depuración
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // 👇 Esto hace que Playwright inicie el servidor de tu app antes de testear
  webServer: {
    command: 'npm run dev',                 // tu comando de desarrollo
    url: 'http://localhost:5173',           // debe coincidir con el baseURL
    reuseExistingServer: !process.env.CI,   // reutiliza si ya está corriendo
    timeout: 120 * 1000                     // 2 minutos para que arranque Vite
  },
});
