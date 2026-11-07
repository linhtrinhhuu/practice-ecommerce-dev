import { test } from '../src/fixtures/admin/admin-login.fixture';
import { authenticateData } from '../src/data/authenticate.data';
import { ENV } from '../src/config/env';
import { getRandomWord } from '../src/utils/helpers'
import { AdminDashboardPage } from '../src/pages/admin/admin-dashboard.page';

test.describe('Verify Authentication cases', async () => {
    test('AUTH_001: Verify UI trang authentication', async ({ adminLoginPage }) => {
        const data = authenticateData.AUTH_001;

        await test.step('Step 1: Verify trang đăng nhập hiển thị thành công', async () => {
            await adminLoginPage.verifyAdminLoginPageDisplayed();
        });

        await test.step('Step 2: Verify các link hiển thị chính xác, khi click vào navigate tới các page tương ứng', async () => {
            // await adminLoginPage.verifyRegisterLinkEnabled();
            await adminLoginPage.verifyLostPasswordLinkEnabled();
            await adminLoginPage.verifyGoToEcommerceDevLinkEnabled();

            // await adminLoginPage.verifyRedirectOnRegisterLink(data.registerLink);
            await adminLoginPage.verifyRedirectOnLostPasswordLink(data.lostPasswordLink);
            await adminLoginPage.verifyRedirectOnGoToEcommerceDevLink(data.goToEcommerceDevLink);
        });
    });

    test('AUTH_002: Verify đăng nhập thành công với username và password đúng', async ({ adminLoginPage }) => {
        const data = authenticateData.AUTH_002;
        let adminDashboardPage: AdminDashboardPage;
        
        await test.step('Step 1: Thực hiện đăng nhập', async () => {
            adminDashboardPage = await adminLoginPage.loginAdmin(ENV.ADMIN_USER, ENV.ADMIN_PASS);
        });

        await test.step('Step 2: Verify đăng nhập thành công', async () => {
            await adminLoginPage.verifyLoggedInSuccessful(data.adminURL, ENV.ADMIN_USER);
            await adminDashboardPage.verifyDashboardPageDisplayed();
        });
    });

    test('AUTH_003: Verify đăng nhập không thành công với các nhóm user: chưa tồn tại, sai mật khẩu', async ({ adminLoginPage }) => {
        const data = authenticateData.AUTH_003;

        await test.step('Step 1: Điền thông tin username không tồn tại, click button login', async () => {
            await adminLoginPage.fillUsername(data.nonExistentUser.username);
            await adminLoginPage.fillPassword(data.nonExistentUser.password);
            await adminLoginPage.clickLoginButton();
        });

        await test.step('Step 2: Verify đăng nhập không thành công', async () => {
            const expectedLoginErrorMsg = `Error: The username ${data.nonExistentUser.username} is not registered on this site. If you are unsure of your username, try your email address instead.`;
            await adminLoginPage.verifyLoginUnsuccessful(expectedLoginErrorMsg);
        });

        await test.step('Step 3: Điền thông tin username admin, password random, click button login', async () => {
            await adminLoginPage.fillUsername(ENV.ADMIN_USER);
            const randomPassword = getRandomWord(8);
            await adminLoginPage.fillPassword(randomPassword);
            await adminLoginPage.clickLoginButton();
        });

        await test.step('Step 4: Verify đăng nhập không thành công và lost password link hoạt động đúng', async () => {
            // Verify đăng nhập không thành công
            const expectedLoginErrorMsg = `Error: The password you entered for the username ${ENV.ADMIN_USER} is incorrect. Lost your password?`;
            await adminLoginPage.verifyLoginUnsuccessful(expectedLoginErrorMsg);

            // Verify lost password link hoạt động đúng
            await adminLoginPage.verifyRedirectOnLostPasswordLinkInErrorMsg(data.lostPasswordLink);
        });
    });
});