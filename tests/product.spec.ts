import { test } from '../src/fixtures/client/product.fixture';
import { productData } from '../src/data/product.data';
import { getRandomWord } from '../src/utils/helpers';

test.describe("Verify product detail page", async () => {

    test.use({ productPath: productData.PRODUCT_001.path });

    test("PRODUCT_001: Verify product page hiển thị đúng với thông tin sản phẩm", async ({ productPage }) => {
        // Nên tạo fixture Setup "Tạo sản phẩm trong admin" trước khi bắt đầu case này.
        const data = productData.PRODUCT_001;

        await test.step("Step 1: Verify các thông tin của sản phẩm", async () => {
            await productPage.verifyProductName(data.productName);
            await productPage.verifyOriginalPrice(data.originalPrice);
            await productPage.verifyCurrentPrice(data.currentPrice);
            await productPage.verifyProductShortDesc(data.productShortDesc);
            await productPage.verifyAddToCartBtnEnabled();

            await productPage.addProductToCartByQuantity(data.productQuantity);
            await productPage.verifyProductAddedToCart(data.productQuantity, data.currentPrice);
        });

        await test.step("Step 2: Click sang tab Review", async () => {
            await productPage.clickReviewTab();
        });

        await test.step("Step 3: Verify chưa có review nào", async () => {
            await productPage.verifyNoReview(data.noReviewText);
        });
    });

    test("PRODUCT_002: Verify tính năng Review hoạt động đúng", async ({ productPage, incognitoPage, reviewContext }) => {
        const data = productData.PRODUCT_002;
        const randomText = getRandomWord(5);

        await test.step("Step 1: Click sang tab Review", async () => {
            await productPage.clickReviewTab();
        });

        await test.step("Step 2: Thực hiện viết Review", async () => {
            await productPage.chooseRating(data.review.star);
            await productPage.fillReviewContent(`${data.review.content} ${randomText}`);
            await productPage.fillAuthorName(data.review.authorName);
            await productPage.fillAuthorEmail(data.review.authorEmail);
            await productPage.checkOnSaveReviewInfo();
            await productPage.clickSubmitReviewButton();
            reviewContext.reviewID = await productPage.getLastReviewID();
        });

        await test.step("Step 3: Verify thông tin review hiển thị trên trang sản phẩm", async () => {
            await productPage.verifyWaitingApprovalMsgVisibleOnNewestReview(`${data.review.content} ${randomText}`); 
        });

        await test.step("Step 4: Refresh page và verify review vẫn hiển thị", async () => {
            await productPage.page.reload();
            await productPage.verifyWaitingApprovalMsgVisibleOnNewestReview(`${data.review.content} ${randomText}`);
        });

        await test.step("Step 5: Mở trình duyệt khác và verify review không hiển thị", async () => {
            await incognitoPage.go(data.path);
            await incognitoPage.verifyNoReview(data.noReviewText);
        });
    });
});