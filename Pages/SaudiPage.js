import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

// SaudiPage class extending from BasePage to reuse common page behaviors
exports.SaudiPage =
    class SaudiPage extends BasePage{
        constructor(newPage1){

            // Call BasePage constructor with the newPage1 instance
            super(newPage1);
            this.page = newPage1;

            // Locator for header icons in the Saudi section
            this.headerIconSaudi = newPage1.locator('.headerIcons');

            // Locator for the text alignment below  the header icons
            this.headerIconTextSaudi = newPage1.locator('.headerIconTextAlignment');
        }

        // Method to validate the visibility and interactivity of header icons and their associated texts
        async validatingIconsSaudi(){
            await this.page.waitForTimeout(2000);

             // Handle any login popups specific to the Saudi flow (assumes saudiLoginPopupHandling() exists in BasePage)
            await this.saudiLoginPopupHandling();

            // Count how many text-aligned icons are present
            const headerIconsCountSaudi = await this.headerIconTextSaudi.count();

             // Iterate over each icon/text pair and assert visibility and interactivity
            for(let i = 0; i < headerIconsCountSaudi ; i++){
                const headerIconSaudi = await this.headerIconSaudi.nth(i)
                const headerIconTextSaudi = await this.headerIconTextSaudi.nth(i);
                
                await expect(headerIconSaudi).toBeVisible();
                await expect(headerIconSaudi).toBeEnabled();
                await expect(headerIconTextSaudi).toBeVisible();
            }
        }
    }
