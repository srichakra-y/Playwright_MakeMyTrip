import {expect} from "@playwright/test"
import { BasePage } from "./BasePage";
import process from "../Inputs/MobileNumberInputValues.json";


// Exporting the HomePage class, extending the reusable BasePage
exports.HomePage =
    class HomePage extends BasePage{
        constructor(page, context){
            super(page); // Call BasePage constructor for popup handling
            this.page = page;
            this.context = context;

             // Locators for top navigation menu buttons
            this.cabsButton = page.locator(".menu_Cabs > span > a");
            this.hotelsButton = page.locator('.menu_Hotels > span > a');
            this.giftCardOption = page.locator('[data-cy="tertiaryRowTitle_Gift Cards"]');

            // Homepage branding icon
            this.logoIcon = page.getByAltText('Make My Trip');

            // App link form elements
            this.mobilenumber = page.getByPlaceholder("Enter Mobile number");
            this.submit = page.getByText('GET APP LINK');
            this.error = page.locator('.messageSentStatusText').nth(0);
            this.success = page.locator('.messageSentStatusText').nth(0);

            // © Footer copywright symbol
            this.copywright = page.locator('.appendBottom5.latoBold.font16');

            // Header icon locators
            this.headerIcons = page.locator('.headerIcons');
            this.headerIconsText = page.locator('.headerIconTextAlignment');

            // Location selector elements 
            this.locbutton = page.locator('.style__LocaleSettingsSelector-sc-1sh96gm-0');
            this.countryDropdown = page.locator('[data-cy="country-dropdown"]');
            this.saudhi = page.locator('[data-cy="SA-country"]');
            this.apply = page.getByTestId('country-lang-submit');
        }

        // Load homepage, wait for required elements, and handle popups
        async goToHomePage(){
            await this.page.goto("https://www.makemytrip.com/");
            await this.page.waitForLoadState('domcontentloaded');
            await expect(this.page).toHaveTitle("MakeMyTrip - #1 Travel Website 50% OFF on Hotels, Flights & Holiday");
            await this.page.waitForTimeout(2000);
            await this.loginHandling();
            await this.advertisementHandling();
        }

        // Validate visibility of homepage logo
        async homePageLogoVerification(){
            await this.logoIcon.isVisible();
        }

        // Click on the "Cabs" menu
        async clickOnCabsMenu(){
            await this.cabsButton.click();
        }

         // Click on the "Hotels" menu
        async clickOnHotelsMenu(){
            await this.hotelsButton.click();
        }

        // Open Gift Cards menu, return new page object from browser context
        async clickOnGiftCardMenu(){
            const [page2] = await Promise.all([
                this.context.waitForEvent('page'),
                this.giftCardOption.click()
            ])
            return page2
        }

        // Submit form to get app download link, using two test numbers
        async getApplink() {
            await this.mobilenumber.fill(process.mobileNumber1);
            await this.submit.click();
            console.log(await this.error.textContent());
            
            await this.page.reload();
            await this.advertisementHandling();
            await this.mobilenumber.clear();
            await this.mobilenumber.fill(process.mobileNumber2);
            await this.submit.click();
            console.log(await this.success.textContent());
        }

        // Validate copywright symbol in footer
        async CopyWrightSymbol() {
            const copytext = await this.copywright.textContent();
            console.log(copytext);
 
            if (copytext.includes("©")) {
                console.log("It contains the copyright symbol:", copytext);
            } else {
                console.log("It is not containing copyright symbol");
            }
        }

        // Verify header icons and their labels are present and active
        async validatingIcons() {
            const headerIconsCount = await this.headerIconsText.count();
            for(let i = 0; i < headerIconsCount ; i++){
                const headerIcon = this.headerIcons.nth(i);
                const headerIconText = this.headerIconsText.nth(i);
                await expect(headerIcon).toBeVisible();
                await expect(headerIcon).toBeEnabled();
                await expect(headerIconText).toBeVisible();
            }
        }

        // Switch website region to Saudi Arabia and return resulting page
        async LocationHandler() {
            await this.locbutton.click();
            await this.page.waitForSelector('[data-cy="country-dropdown"]');
            await this.countryDropdown.click();
            await this.page.waitForSelector('[data-cy="SA-country"]')
            await this.saudhi.click();     

            const [newPage] = await Promise.all(
                [
                    this.context.waitForEvent('page'),
                    this.apply.click()
                ]
            );
            return newPage;
        }
    }