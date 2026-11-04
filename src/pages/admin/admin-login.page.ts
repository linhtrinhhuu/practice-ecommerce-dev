import { Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./admin-base.page"

export class AdminLoginPage extends AdminBasePage {
    loginURL: string;
    usernameTextbox: Locator;
    passwordTextbox: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginURL = 'https://e-commerce-dev.betterbytesvn.com/wp-login.php';
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username or Email Address' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
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
}