import {BasePage} from './BasePage';
import fs from 'fs';

// SUVCarPage class extends the base page for SUV-specific interactions
exports.SUVCarPage = 
    class SUVCarPage extends BasePage{
        constructor(page){
            super(page);
            this.page = page,

            // Locator for cab type titles (e.g., SUV, Sedan)
            this.cabTypeName = page.locator(".filterSection_title__vHRpx");

            // Checkbox locator for selecting SUV filter
            this.suvCheckbox = page.locator(".checkbox_checkbox__FA7_p");

            // Locator for displayed car names
            this.carNameSelector = page.getByTestId('CAB_TITLE');

            // Locator for car price elements
            this.carPriceSelector = page.locator('.cabDetailsCard_price__SHN6W');

            // Locator for pickup time input field
            this.pickupTime = page.locator('#pickup_time');
        }

        // Select SUV cab type by clicking its checkbox if found
        async suvCarSelection(){
            await this.page.waitForLoadState('load');
            await this.page.waitForTimeout(2000);
            await this.himachalPopupHandling();

            // Loop through visible cab types to find and select 'SUV'
            for(let i=1; i<4; i++){
                let cabType = await this.cabTypeName.nth(i);
                if(await cabType.textContent() == 'SUV'){
                    await this.suvCheckbox.nth(i-1).click();
                    break;
                }
            }   
        }

        // Retrieve car names and prices, sort by price, and save the two cheapest options to a file
        async carNamePrice(){
            const suvCarsCount = await this.carNameSelector.count();
            let carNames = [];
            let carPrices = [];

            // Collect name and price for each car
            for(let i=0; i < suvCarsCount; i++){
                let carName = await this.carNameSelector.nth(i);
                let cabprice = await this.carPriceSelector.nth(i);

                carNames.push(await carName.textContent());
                let carPriceText = await cabprice.textContent();
                let carPrice = parseInt(carPriceText.replace(/[^0-9]/g,""),10);
                carPrices.push(carPrice);   
            }

            // Combine car names and prices into an array of objects
            let combinedArray = carNames.map((name, index) => ({
                carName: name,
                carPrice: carPrices[index]
            }));

            // Sort array by price (ascending)
            combinedArray.sort((a,b) => a.carPrice-b.carPrice);

            // Select top 2 cheapest SUV options
            const lowestCabs = combinedArray.slice(0,2);

            // Print results in console
            for(const val of lowestCabs){
                console.log(val.carName +" - "+val.carPrice);
            }

            // Save results to a JSON file
            fs.writeFileSync("Outputs/CabResults.json",JSON.stringify({lowestCabs}, null, 2));
        }

        // ⌚ Retrieve the pickup time displayed on the car details page
        async pickupTimeInCarPage(){
            await this.page.waitForLoadState('domcontentloaded')
            await this.himachalPopupHandling();
            return await this.pickupTime.getAttribute('value');
        }
    }