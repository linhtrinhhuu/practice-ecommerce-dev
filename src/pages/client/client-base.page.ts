import { expect, Locator, Page } from "@playwright/test";

export class ClientBasePage {
    page: Page;
    searchIcon: Locator;
    searchBox: Locator;
    shopMenu: Locator;
    blogMenu: Locator;
    certificateMenu: Locator;
    playwrightMenu: Locator;
    toolMenu: Locator;
    myAccountMenu: Locator;
    resultItem: Locator;
    itemHeading: Locator;
    resultText: Locator;
    cartCounter: Locator;
    cartIcon: Locator;
    cartSubtotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchIcon = page.getByRole('link', { name: 'Search for a product' });
        this.searchBox = page.getByPlaceholder("Search products…").first();
        this.shopMenu = page.getByRole("link", { name: "Shop" });
        this.blogMenu = page.getByRole("link", { name: "Blog" });
        this.certificateMenu = page.getByRole("link", { name: "Chứng chỉ" });
        this.playwrightMenu = page.getByRole("link", { name: "Playwright" }).first();
        this.toolMenu = page.getByRole("link", { name: "Công cụ" });
        this.myAccountMenu = page.getByRole("link", { name: "My Account" });
        this.resultItem = page.locator("li.product");
        this.itemHeading = this.resultItem.locator("h2");
        this.resultText = page.getByText("Showing all");
        this.cartCounter = page.locator('.cart-count .count-number').first();
        this.cartIcon = page.locator('.cart-contents').first();
        this.cartSubtotal = page.locator('.woocommerce-mini-cart__total .woocommerce-Price-amount').first();
    }

    async verifySearchBoxHavePlaceholder() {
        await this.searchIcon.click();
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.press("Enter"); // Press Enter to close Search frame
    }

    async verifyFullMenu() {
        await expect(this.shopMenu).toBeVisible();
        await expect(this.blogMenu).toBeVisible();
        await expect(this.certificateMenu).toBeVisible();
        await expect(this.playwrightMenu).toBeVisible();
        await expect(this.toolMenu).toBeVisible();
        await expect(this.myAccountMenu).toBeVisible();
    }

    async searchProduct(string: string) {
        await this.searchIcon.click();
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
        const cleanPriceStr = parseFloat(
            priceString.replace(/,/g, '').replace(/[^\d.]/g, '')
        );
        return Number(cleanPriceStr);
    }

    async verifyCartCounter(quantity: number) {
        const cartCounterNum = Number(await this.cartCounter.textContent());
        await expect(cartCounterNum).toBe(quantity);
    }

    async hoverOnCartIcon() {
        await this.cartIcon.hover();
    }

    async verifyCartSubtotalAmount(quantity: number, price: number) {
        await this.hoverOnCartIcon();
        console.log(`cartSubTotal: ${await this.cartSubtotal.innerText()}`);
        const cartSubtotalNum = await this.parsePriceToNumber(await this.cartSubtotal.innerText());
        console.log(`cartSubtotalNum: ${cartSubtotalNum}`);
        const cartSubtotalExpected = quantity * price;
        await expect(cartSubtotalNum).toBe(cartSubtotalExpected);
    }
}