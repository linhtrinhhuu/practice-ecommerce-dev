import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./client-base.page";

export class HomePage extends BasePage{
    homeURL: string;

    constructor(page: Page) {
        super(page);
        this.homeURL = "https://e-commerce-dev.betterbytesvn.com/";
    }

    async go() {
        await this.page.goto(this.homeURL);
    }

    async verifyTitlePageHave(title: string | RegExp) {
        await expect(this.page).toHaveTitle(title);
    }
}