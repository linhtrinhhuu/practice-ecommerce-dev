import { test } from '../src/fixtures/home.fixture';

test.describe("Kiểm tra homepage", () => {

    // Fixture:
        // Before
        // Đi tới trang https://e-commerce-dev.betterbytesvn.com/

        // After

    test("HOME_001: Kiểm tra homepage hiển thị thành công", async ({ homePage }) => {
        const homePageData = {
            title: /E-commerce site testing/
        };

        // Step 1:  Verify trang chủ hiển thị thành công;
        await test.step("Step 2: Verify trang chủ hiển thị thành công", async () => {
            await homePage.verifyTitlePageHave(homePageData.title);
            // Thanh tìm kiếm hiển thị placeholder "Search products..."
            await homePage.verifySearchBoxHavePlaceholder();
            // Menu: "Trang chủ", "Danh sách khóa học", "Blog"
            await homePage.verifyFullMenu();
        });
    });

    test("HOME_002: Kiểm tra tính năng search hoạt động đúng", async ({ homePage }) => {
        const homePageData = {
            searchString: "ISTQB"
        };

        // Step 1: Search keyword "ISTQB"
        await test.step('Step 1: Search keyword "ISTQB"', async () => {
            await homePage.searchProduct(homePageData.searchString);
        });

        // Step 2:  Verify tất cả kết quả
        await test.step('Step 2: Verify kết quả', async () => {
            //Đều chứa "ISTQB"
            await homePage.verifyResultsContainString(homePageData.searchString);

            // Hiển thị text showing X result = Total result number
            await homePage.verifyResultItemNumberMacthTextResultNumber();


        });
    });
});