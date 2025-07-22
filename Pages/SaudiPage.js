import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

exports.SaudiPage =
    class SaudiPage extends BasePage{
        constructor(newPage1){
            super(newPage1);
            this.page = newPage1;
            this.headerIconSaudi = newPage1.locator('.headerIcons');
            this.headerIconTextSaudi = newPage1.locator('.headerIconTextAlignment');
        }

        async validatingIconsSaudi(){
            const headerIconsCountSaudi = await this.headerIconTextSaudi.count();
            for(let i = 0; i < headerIconsCountSaudi ; i++){
                const headerIconSaudi = await this.headerIconSaudi.nth(i)
                const headerIconTextSaudi = await this.headerIconTextSaudi.nth(i);
                await expect(headerIconSaudi).toBeVisible();
                await expect(headerIconSaudi).toBeEnabled();
                await expect(headerIconTextSaudi).toBeVisible();
            }
        }
    }