import fs from 'fs';
import { expect } from '@playwright/test';

exports.HotelsPage =
 class HotelPage{
    constructor(page){
        this.page = page;
        this.roomsAndGuestOption = page.locator('[data-cy="HotelSearchWidget_319"]')
        this.adultsDropDown = page.locator('.gstSlctCont').nth(1);
        this.adults = page.locator('[data-cy="GuestSelect$$_323"]');
        this.roomOptionFields=page.locator(".rmsGst__row > div > p");
    }

    async guestsSelection(){
        await this.roomsAndGuestOption.click();
        await this.adultsDropDown.click();
        const maxAdultsSelection = await this.adults.count();
        const adultsOptions = [];
        for(let i=0; i<maxAdultsSelection; i++){
            let adultscount = await this.adults.nth(i);
            adultsOptions.push(await adultscount.textContent());
        }
        console.log(adultsOptions);
        fs.writeFileSync("Outputs/AdultList.json",JSON.stringify({adultsOptions},null,2))
    }

    async adultCount(){
        await this.roomsAndGuestOption.click();
        await this.adultsDropDown.click();
        const maxAdultsSelection = await this.adults.count();
        await expect(maxAdultsSelection).toBe(40);
    }

    async roomAndGuestsValidation(){
        await this.roomsAndGuestOption.click();
        const fieldsCountawait = await this.roomOptionFields.count();
        const optionsArr=["Room","Adults","Children"];
        for(let i=0;i<fieldsCountawait-1;i++){
            const field= await this.roomOptionFields.nth(i);
            let fieldValue=await field.textContent();
            console.log(fieldValue);
            await expect(fieldValue).toBe(optionsArr[i]);
        }
    }
 }