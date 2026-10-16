import { expect, Locator, Page } from "@playwright/test";

export class BasePage{
    page: Page;
    searchBox: Locator;
    homeMenu: Locator;
    couserListMenu: Locator;
    blogMenu: Locator;
    resultItem: Locator;
    itemHeading: Locator;
    textResult: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchBox = page.getByRole("textbox", { name: "Search products..." });
        this.homeMenu = page.getByRole("link", { name: "Trang chủ" });
        this.couserListMenu = page.getByRole("link", { name: "Danh sách khoá học" });
        this.blogMenu = page.getByRole("link", { name: "Blog" });
        this.resultItem = page.locator("li.product");
        this.itemHeading = this.resultItem.locator("h2");
        this.textResult = page.getByText("Showing all");
    }

    async verifySearchBoxHavePlaceholder() {
        await expect(this.searchBox).toBeVisible();
    }

    async verifyFullMenu() {
        await expect(this.homeMenu).toBeVisible();
        await expect(this.couserListMenu).toBeVisible();
        await expect(this.blogMenu).toBeVisible();

    }

    async searchProduct(string: string) {
        await this.searchBox.fill(string);
        await this.searchBox.press("Enter");
    }

    async verifyResultsContainString(string: string) {
        const itemHeadingNumber = await this.itemHeading.count();
        for (let i = 0; i < itemHeadingNumber; i++) {
            await expect(this.itemHeading.nth(i)).toContainText(string);
        }
    }

    async verifyResultItemNumberMacthTextResultNumber() {
        const resultItemNumber = await this.resultItem.count();
        const textResultString = (await this.textResult.innerText()).replace("Showing all", "").replace("results", "").trim();
        const textResultNumber = parseInt(textResultString);

        await expect(resultItemNumber).toBe(textResultNumber);
    }
}