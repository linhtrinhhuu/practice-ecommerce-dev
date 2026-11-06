import { expect, Locator, Page } from "@playwright/test";
import { ClientBasePage } from "./client-base.page";

export class ProductPage extends ClientBasePage {
    productURL: string;
    productName: Locator;
    originalPrice: Locator;
    currentPrice: Locator;
    productShortDesc: Locator;
    productQuantityTextbox: Locator;
    addToCartBtn: Locator;
    reviewTab: Locator;
    noReviewLabel: Locator;
    ratingOneSelection: Locator;
    ratingTwoSelection: Locator;
    ratingThreeSelection: Locator;
    ratingFourSelection: Locator;
    ratingFiveSelection: Locator;
    reviewContentTextbox: Locator;
    reviewNameTextbox: Locator;
    reviewEmailTextbox: Locator;
    saveReviewInfoCheckbox: Locator;
    reviewSubmitButton: Locator;
    reviewWaitingApprovalText: Locator;
    reviewContentLabel: Locator;
    lastReviewContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.productURL = 'https://e-commerce-dev.hoctest.com/product';
        this.productName = page.getByRole('heading', { level: 1 });
        this.originalPrice = page.locator('.summary').locator('.screen-reader-text').filter({ hasText: 'Original price was' });
        this.currentPrice = page.locator('.summary').locator('.screen-reader-text').filter({ hasText: 'Current price is' });
        this.productShortDesc = page.locator('.woocommerce-product-details__short-description');
        this.productQuantityTextbox = page.getByRole('spinbutton', { name: 'Product quantity' });
        this.addToCartBtn = page.locator('.summary').getByRole('button', { name: "Add to cart" });
        this.reviewTab = page.getByRole('tab', { name: 'Reviews' });
        this.noReviewLabel = page.locator('.woocommerce-noreviews');
        this.ratingOneSelection = page.getByRole('radio', { name: '1 of 5 stars' });
        this.ratingTwoSelection = page.getByRole('radio', { name: '2 of 5 stars' });
        this.ratingThreeSelection = page.getByRole('radio', { name: '3 of 5 stars' });
        this.ratingFourSelection = page.getByRole('radio', { name: '4 of 5 stars' });
        this.ratingFiveSelection = page.getByRole('radio', { name: '5 of 5 stars' });
        this.reviewContentTextbox = page.getByRole('textbox', { name: 'Your review' });
        this.reviewNameTextbox = page.getByRole('textbox', { name: 'Name' });
        this.reviewEmailTextbox = page.getByRole('textbox', { name: 'Email' });
        this.saveReviewInfoCheckbox = page.getByRole('checkbox', { name: 'Save my name, email' });
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit' });
        this.reviewWaitingApprovalText = page.getByText('Your review is awaiting approval').last();
        this.reviewContentLabel = page.locator('.comment-text .description').last();
        this.lastReviewContainer = page.locator('.comment_container').last();
    }

    async go(path: string) {
        await this.page.goto(`${this.productURL}${path}`);
    }

    async verifyProductName(productName: string) {
        const productNameText = await this.productName.innerText();
        await expect(productNameText).toBe(productName);
    }

    async verifyOriginalPrice(originalPrice: number) {
        const originalPriceNum = await this.parsePriceToNumber((await this.originalPrice.textContent())!);
        await expect(originalPriceNum).toBe(originalPrice);
    }

    async verifyCurrentPrice(currentPrice: number) {
        const currentPriceNum = await this.parsePriceToNumber((await this.currentPrice.textContent())!);
        await expect(currentPriceNum).toBe(currentPrice);
    }

    async verifyProductShortDesc(productShortDesc: string) {
        const productShortDescText = await this.productShortDesc.innerText();
        await expect(productShortDescText).toBe(productShortDesc);
    }

    async verifyAddToCartBtnEnabled() {
        await expect(this.addToCartBtn).toBeEnabled();
    }

    async addProductToCartByQuantity(quantity: number) {
        await this.productQuantityTextbox.fill(String(quantity));
        await this.addToCartBtn.click();
    }

    async verifyProductAddedToCart(quantity: number, price: number) {
        await this.verifyCartCounter(quantity);
        await this.verifyCartSubtotalAmount(quantity, price);
    }

    async clickReviewTab() {
        await this.reviewTab.click();
    }

    async verifyNoReview(reviewText: string) {
        const noReviewLabel = await this.noReviewLabel.innerText();
        await expect(noReviewLabel).toBe(reviewText);
    }

    async chooseRating(star: number) {
        if (star === 1) {
            await this.ratingOneSelection.check();
        } else if (star === 2) {
            await this.ratingTwoSelection.check();
        } else if (star === 3) {
            await this.ratingThreeSelection.check();
        } else if (star === 4) {
            await this.ratingFourSelection.check();
        } else if (star === 5) {
            await this.ratingFiveSelection.check();
        }
    }

    async fillReviewContent(content: string) {
        await this.reviewContentTextbox.fill(content);
    }

    async fillAuthorName(name: string) {
        await this.reviewNameTextbox.fill(name);
    }

    async fillAuthorEmail(email: string) {
        await this.reviewEmailTextbox.fill(email);
    }

    async checkOnSaveReviewInfo() {
        await this.saveReviewInfoCheckbox.check();
    }

    async clickSubmitReviewButton() {
        await this.reviewSubmitButton.click();
    }

    async verifyWaitingApprovalMsgVisibleOnNewestReview(contentExpected: string) {
        const contentLabelReceived = await this.reviewContentLabel.innerText();
        await expect(contentLabelReceived).toBe(contentExpected);
        await expect(this.reviewWaitingApprovalText).toBeVisible;
    }

    async getLastReviewID() {
        const reviewID = (await this.lastReviewContainer.getAttribute('id'))?.replace('comment-', '');
        return reviewID || '';
    }
}

