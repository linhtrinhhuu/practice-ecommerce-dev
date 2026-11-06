import { expect, Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./admin-base.page";

export class AdminDashboardPage extends AdminBasePage {
    dashboardHeading: Locator;
    atAGlanceHeading: Locator;
    activityHeading: Locator;
    wpEventAndNewsHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
        this.atAGlanceHeading = page.getByRole('heading', { name: 'At a Glance', level: 2 });
        this.activityHeading = page.getByRole('heading', { name: 'Activity', level: 2 });
        this.wpEventAndNewsHeading = page.getByRole('heading', { name: 'WordPress Events and News', level: 2 });
    }

    async verifyDashboardPageDisplayed() {
        // Verify trang dashboard hiển thị; có 3 block: "At a Glance", "Activity", "WordPress Events and News" hiển thị
        await expect(this.dashboardHeading).toBeVisible();
        await expect(this.atAGlanceHeading).toBeVisible();
        await expect(this.activityHeading).toBeVisible();
        await expect(this.wpEventAndNewsHeading).toBeVisible();
    }
}