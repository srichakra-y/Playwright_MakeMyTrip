import fs from 'fs';
import { expect } from '@playwright/test';

exports.HotelsPage =
 class HotelPage{
    constructor(page){
        this.page = page;

        // Locator for the Room & Guests dropdown trigger
        this.roomsAndGuestOption = page.locator('[data-cy="HotelSearchWidget_319"]')

        // Locator for the adults dropdown menu
        this.adultsDropDown = page.locator('.gstSlctCont').nth(1);

        // Locator for the selectable adult count options
        this.adults = page.locator('[data-cy="GuestSelect$$_323"]');

        // Locator for Room, Adults, Children fields in the Room & Guests section
        this.roomOptionFields=page.locator(".rmsGst__row > div > p");
    }

    // Get list of all available adult count options and write them to a JSON file
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

    // Validate the maximum number of adult guests displayed (expected: 40)
    async adultCount(){
        await this.roomsAndGuestOption.click();
        await this.adultsDropDown.click();
        const maxAdultsSelection = await this.adults.count();
        await expect(maxAdultsSelection).toBe(40);
    }

    // Validate labels "Room", "Adults", "Children" are correctly shown
    async roomAndGuestsValidation(){
        await this.roomsAndGuestOption.click();

        const fieldsCountawait = await this.roomOptionFields.count();
        const optionsArr=["Room","Adults","Children"];

        // Iterate and validate each field against expected label
        for(let i=0;i<fieldsCountawait-1;i++){
            const field= await this.roomOptionFields.nth(i);
            let fieldValue=await field.textContent();
            console.log(fieldValue);
            await expect(fieldValue).toBe(optionsArr[i]);
        }
    }
 }