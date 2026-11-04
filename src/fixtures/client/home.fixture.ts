import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/client/home.page';

export const test = base.extend<{ homePage: HomePage }>({
    homePage: async ({ page }, use) => {
        // Setup
        const homePage = new HomePage(page);

        await test.step('Setup 1: Đi tới trang chủ', async () => {
            await homePage.go();
        });

        // Test run
        await use(homePage);

        // Teardown
    }
})