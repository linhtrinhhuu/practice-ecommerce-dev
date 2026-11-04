import { expect, Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./admin-base.page";

export class AdminProductReviewPage extends AdminBasePage {
    bulkActionCombobox: Locator;
    applyActionsButton: Locator;
    trashTabLink: Locator;

    constructor(page: Page) {
        super(page);
        this.bulkActionCombobox = page.getByRole('combobox', { name: 'Select bulk action' }).first();
        this.applyActionsButton = page.getByRole('button', { name: 'Apply' }).first();
        this.trashTabLink = page.getByRole('link', { name: 'Trash' });
    }

    async go() {
        await this.productMenu.click();
        await this.productReviewMenu.click();
    }

    async getReviewCheckboxIDLocator(reviewId: string) {
        const reviewCheckboxID = `#cb-select-${reviewId}`;
        const reviewCheckboxIDLocator = this.page.locator(reviewCheckboxID);
        return reviewCheckboxIDLocator;
    }

    async selectReviewCheckbox(reviewId: string) {
        const reviewCheckboxLocator = await this.getReviewCheckboxIDLocator(reviewId);
        await reviewCheckboxLocator.check();
    }

    async selectMoveToTrash() {
        await this.bulkActionCombobox.selectOption('Move to Trash');
    }

    async clickApplyAction() {
        await this.applyActionsButton.click();
    }

    async verifyReviewMovedToTrash(reviewId: string) {
        // Refresh page and check review đó ko hiện trên trang 
        await this.page.reload();
        const reviewCheckboxLocator = await this.getReviewCheckboxIDLocator(reviewId);
        await expect(reviewCheckboxLocator).not.toBeVisible();

        // Sang Trash tab và check review đã xóa ở trên tab này
        await this.trashTabLink.click();
        await expect(reviewCheckboxLocator).toBeVisible();
    }

    async deleteReviewByID(reviewId: string) {
        await this.go();
        await this.selectReviewCheckbox(reviewId);
        await this.selectMoveToTrash();
        await this.clickApplyAction();

        await this.verifyReviewMovedToTrash(reviewId);
    }
}