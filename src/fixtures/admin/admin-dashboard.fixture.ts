import { test as base } from '@playwright/test';
import { AdminDashboardPage } from '../../pages/admin/admin-dashboard.page';

export const test = base.extend<{ adminDashboardPage: AdminDashboardPage }>({
    adminDashboardPage: async ({ page }, use) => {
        // Setup
        const adminDashboardPage = new AdminDashboardPage(page);

        // Test run
        await use(adminDashboardPage);

        // Teardown
    }
})