import { test as base } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/admin-login.page';

export const test = base.extend<{ adminLoginPage: AdminLoginPage }>({
    adminLoginPage: async ({ page }, use) => {
        // Setup
        const adminLoginPage = new AdminLoginPage(page);

        await test.step('Setup 1: Truy cập trang đăng nhập admin', async () => {
            await adminLoginPage.go();
        });

        // Test run
        await use(adminLoginPage);
        // Teardown
    }
})