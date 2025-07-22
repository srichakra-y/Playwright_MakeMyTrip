import {BasePage} from './BasePage';
import fs from 'fs';

exports.SUVCarPage = 
    class SUVCarPage extends BasePage{
        constructor(page){
            super(page);
            this.page = page,
            this.cabTypeName = page.locator(".filterSection_title__vHRpx");
            this.suvCheckbox = page.locator(".checkbox_checkbox__FA7_p");
            this.carNameSelector = page.getByTestId('CAB_TITLE');
            this.carPriceSelector = page.locator('.cabDetailsCard_price__SHN6W');
            this.moreOption = page.locator('[data-cy="menu_More"]');
            this.giftCardOption = page.locator('[data-cy="submenu_Giftcards"]');
        }

        async suvCarSelection(){
            await this.page.waitForLoadState('load');
            await this.page.waitForTimeout(1000);
            await this.himachalPopupHandling();
            for(let i=1; i<4; i++){
                let cabType = await this.cabTypeName.nth(i);
                if(await cabType.textContent() == 'SUV'){
                    await this.suvCheckbox.nth(i-1).click();
                }
            }
        }

        async carNamePrice(){
            const suvCarsCount = await this.carNameSelector.count();
            let carNames = [];
            let carPrices = [];
            for(let i=0; i < suvCarsCount; i++){
                let carName = await this.carNameSelector.nth(i);
                let cabprice = await this.carPriceSelector.nth(i);
                carNames.push(await carName.textContent());
                let carPriceText = await cabprice.textContent();
                let carPrice = parseInt(carPriceText.replace(/[^0-9]/g,""),10);
                carPrices.push(carPrice);
            }
            let combinedArray = carNames.map((name, index) => ({
                carName: name,
                carPrice: carPrices[index]
            }));
            combinedArray.sort((a,b) => a.carPrice-b.carPrice);
            const lowestCabs = combinedArray.slice(0,2);
            for(const val of lowestCabs){
                console.log(val.carName +" - "+val.carPrice);
            }
        }

        async giftCardOptionSelection(){
            await this.moreOption.hover();
            await this.giftCardOption.click();
        }
    }