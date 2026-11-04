import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;
    searchBox: Locator;
    homeMenu: Locator;
    couserListMenu: Locator;
    blogMenu: Locator;
    resultItem: Locator;
    itemHeading: Locator;
    resultText: Locator;
    cartCounter: Locator;
    cartAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole("textbox", { name: "Search products..." });
        this.homeMenu = page.getByRole("link", { name: "Trang chủ" });
        this.couserListMenu = page.getByRole("link", { name: "Danh sách khoá học" });
        this.blogMenu = page.getByRole("link", { name: "Blog" });
        this.resultItem = page.locator("li.product");
        this.itemHeading = this.resultItem.locator("h2");
        this.resultText = page.getByText("Showing all");
        this.cartCounter = page.locator('.cart-counter .count');
        this.cartAmount = page.locator('.amount-cart');
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
        const resultString = (await this.resultText.innerText()).replace("Showing all", "").replace("results", "").trim();
        const resultNumber = parseInt(resultString);

        await expect(resultItemNumber).toBe(resultNumber);
    }

    async parsePriceToNumber(priceString: string) {
        const cleanPriceStr = priceString.replace(/\./g, '').replace(/[^\d]/g, '');
        return Number(cleanPriceStr);
    }

    async verifyCartCounter(quantity: number) {
        const cartCounterNum = Number(await this.cartCounter.textContent());
        await expect(cartCounterNum).toBe(quantity);
    }

    async verifyCartAmount(quantity: number, price: number) {
        console.log(`cartAmount: ${await this.cartAmount.innerText()}`);
        await expect(this.cartAmount).not.toHaveText(''); // We got flaky test on row below. So this row to make sure cartAmount not null.
        const cartAmountNum = await this.parsePriceToNumber(await this.cartAmount.innerText());
        console.log(`cartAmountNum: ${cartAmountNum}`);
        const cartAmountExpected = quantity * price;
        await expect(cartAmountNum).toBe(cartAmountExpected);
    }
}