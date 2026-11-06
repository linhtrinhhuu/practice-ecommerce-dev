import { expect, Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./admin-base.page"

export class AdminLoginPage extends AdminBasePage {
    loginURL: string;
    usernameTextbox: Locator;
    passwordTextbox: Locator;
    rememberMeCheckbox: Locator;
    loginButton: Locator;
    registerLink: Locator;
    lostPasswordLink: Locator;
    goToEcommerceDevLink: Locator;

    constructor(page: Page) {
        super(page);
        this.loginURL = 'https://e-commerce-dev.hoctest.com/wp-login.php';
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username or Email Address' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember Me' });
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.lostPasswordLink = page.getByRole('link', { name: 'Lost your password?' });
        this.goToEcommerceDevLink = page.getByRole('link', { name: 'Go to E-Commerce' });
    }

    async go() {
        await this.page.goto(this.loginURL);
    }

    async fillUsername(user: string) {
        await this.usernameTextbox.fill(user);
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginAdmin(user: string, password: string) {
        await this.go();
        await this.fillUsername(user);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async verifyUsernameTextboxEnabled() {
        await expect(this.usernameTextbox).toBeEnabled();
    }

    async verifyPasswordTextboxEnabled() {
        await expect(this.passwordTextbox).toBeEnabled();
    }

    async verifyRememberMeCheckboxEnabled() {
        await expect(this.rememberMeCheckbox).toBeEnabled();
    }

    async verifyLoginButtonEnabled() {
        await expect(this.loginButton).toBeEnabled();
    }

    async verifyAdminLoginPageDisplayed() {
        await this.verifyUsernameTextboxEnabled();
        await this.verifyPasswordTextboxEnabled();
        await this.verifyRememberMeCheckboxEnabled();
        await this.verifyLoginButtonEnabled();
    }

    async verifyRegisterLinkEnabled() {
        await expect(this.registerLink).toBeEnabled();
    }

    async verifyLostPasswordLinkEnabled() {
        await expect(this.lostPasswordLink).toBeEnabled();
    }
    async verifyGoToEcommerceDevLinkEnabled() {
        await expect(this.goToEcommerceDevLink).toBeEnabled();
    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async clickLostPasswordLink() {
        await this.lostPasswordLink.click();
    }

    async clickGoToEcommerceDevLink() {
        await this.goToEcommerceDevLink.click();
    }

    async verifyRedirectOnRegisterLink(link: string) {
        await this.clickRegisterLink();
        await expect(this.page).toHaveURL(link);
        await this.page.goBack();
    }

    async verifyRedirectOnLostPasswordLink(link: string) {
        await this.clickLostPasswordLink();
        await expect(this.page).toHaveURL(link);
        await this.page.goBack();
    }
    async verifyRedirectOnGoToEcommerceDevLink(link: string) {
        await this.clickGoToEcommerceDevLink();
        await expect(this.page).toHaveURL(link);
        await this.page.goBack();
    }

}