import { Locator, Page } from "@playwright/test";

export class AdminBasePage {
    page: Page;
    productMenu: Locator;
    productReviewMenu: Locator;

    usernameLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productMenu = page.locator('#menu-posts-product');
        this.productReviewMenu = page.locator('#menu-posts-product').getByRole('link', { name: 'Reviews' });
        this.usernameLabel = page.locator('.display-name').first();
    }

    async getUsernameLabel() {
        const usernameLabelText = await this.usernameLabel.innerText();
        return usernameLabelText;
    }
}