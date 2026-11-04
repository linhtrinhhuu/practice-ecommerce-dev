import { test as base, Browser, chromium } from '@playwright/test';
import { ProductPage } from '../../pages/client/product.page';
import { AdminLoginPage } from '../../pages/admin/admin-login.page';
import { ENV } from '../../config/env'
import { AdminProductReviewPage } from '../../pages/admin/admin-product-reviews.page';


type ProductFixtures = {
    productPage: ProductPage;
    productPath: string;
    incognitoPage: ProductPage;
    reviewContext: { reviewID: string };
};

export const test = base.extend<ProductFixtures>({
    productPath: ['', { option: true }],

    reviewContext: async ({ }, use) => {
        // Setup
        const context = { reviewID: '' };

        // Test run
        await use(context);

        //Teardown
        console.log("Giá trị reviewContext.reviewID trước khi teardown là: [", context.reviewID, "]");
        // Nếu không có reviewID thì sẽ không thực hiện các bước xóa review
        if (!context.reviewID || context.reviewID === '') {
            return;
        }

        // Sử dụng try/finnaly để ép Playwright đóng phiên làm việc với admin page kể cả khi có lỗi ở teardown để đỡ tốn tài nguyên máy sau mỗi lần chạy test
        let adminBrowser: Browser | undefined;
        try {
            // Mở 1 chromium mới để không ảnh hưởng tới session của product test
            adminBrowser = await chromium.launch({ headless: false });
            const adminContext = await adminBrowser.newContext();
            const adminPage = await adminContext.newPage();

            // Đến Login Admin page và đăng nhập
            const adminLoginPage = new AdminLoginPage(adminPage);
            await adminLoginPage.loginAdmin(ENV.ADMIN_USER, ENV.ADMIN_PASS);

            // Đến Review Product Page và thực hiện xóa review với ID đã có
            const adminProductReviewPage = new AdminProductReviewPage(adminPage);
            await adminProductReviewPage.deleteReviewByID(context.reviewID);

        } finally {
            // Luôn đóng trình duyệt Admin
            await adminBrowser?.close();
        }
    },

    productPage: async ({ page, productPath }, use) => {
        // Setup
        const productPage = new ProductPage(page);

        await test.step("Setup 1: Truy cập trang chi tiết sản phẩm", async () => {
            await productPage.go(productPath);
        });

        // Test run
        await use(productPage);

        // Teardown
        // Note xương máu: đừng bao giờ bọc code của teardown trong test.step() vì Playwright sẽ end test trước khi chạy đến test.step()
    },

    incognitoPage: async ({ browser }, use) => {
        // Setup
        const context = await browser.newContext();
        const page = await context.newPage();
        const incognitoPage = new ProductPage(page);

        // Test run
        await use(incognitoPage);

        // Teardown
        await context.close();
    }
})