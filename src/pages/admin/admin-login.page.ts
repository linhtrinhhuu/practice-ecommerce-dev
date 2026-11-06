import { expect, Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./admin-base.page"
import { AdminDashboardPage } from "./admin-dashboard.page";

export class AdminLoginPage extends AdminBasePage {
    loginURL: string;
    usernameTextbox: Locator;
    passwordTextbox: Locator;
    rememberMeCheckbox: Locator;
    loginButton: Locator;
    registerLink: Locator;
    lostPasswordLink: Locator;
    goToEcommerceDevLink: Locator;
    loginError: Locator;
    lostPasswordLinkInErrorMsg: Locator;

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
        this.loginError = page.locator('#login_error');
        this.lostPasswordLinkInErrorMsg = page.locator('#login_error').getByRole('link', { name: 'Lost your password?' });
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

    async verifyRedirectOnRegisterLink(expectedLink: string) {
        await this.clickRegisterLink();
        await expect(this.page).toHaveURL(expectedLink);
        await this.page.goBack();
    }

    async verifyRedirectOnLostPasswordLink(expectedLink: string) {
        await this.clickLostPasswordLink();
        await expect(this.page).toHaveURL(expectedLink);
        await this.page.goBack();
    }

    async verifyRedirectOnGoToEcommerceDevLink(expectedLink: string) {
        await this.clickGoToEcommerceDevLink();
        await expect(this.page).toHaveURL(expectedLink);
        await this.page.goBack();
    }

    async verifyLoggedInSuccessful(expectedURL: string, expectedUsername: string): Promise<AdminDashboardPage> {
        // Verify chuyển hướng tới đúng trang admin
        await expect(this.page).toHaveURL(expectedURL);

        // Verify user đã login
        const usernameLabel = await this.getUsernameLabel();
        await expect(usernameLabel).toBe(expectedUsername);

        return new AdminDashboardPage(this.page);
    }

    async verifyLoginUnsuccessful(expectedErrorMsg: string, link?: string) {
        // - Đăng nhập không thành công, vẫn ở trang login.
        await expect(this.page).toHaveURL(this.loginURL);

        // - Hiển thị message lỗi: "Error: The username [user] is not registered on this site. If you are unsure of your username, try your email address instead."
        const loginErrorMsg = await this.loginError.innerText();
        await expect(loginErrorMsg).toBe(expectedErrorMsg);
    }

    async clickRedirectOnLostPasswordLinkInErrorMsg() {
        await expect(this.lostPasswordLinkInErrorMsg).toBeEnabled();
        await this.lostPasswordLinkInErrorMsg.click();
    }

    async verifyRedirectOnLostPasswordLinkInErrorMsg(expectedLink: string) {
        await this.clickRedirectOnLostPasswordLinkInErrorMsg();
        await expect(this.page).toHaveURL(expectedLink);
    }
}