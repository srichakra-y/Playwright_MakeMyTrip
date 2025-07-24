import { test, expect, chromium } from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { CabsPage } from "../Pages/CabsPage"
import { SUVCarPage } from "../Pages/SUVCarPage";
import { GiftCardPage } from "../Pages/GiftCardPage";
import { HotelsPage } from "../Pages/HotelsPage";
import process from "../Inputs/GiftCardInputValues.json";
import { SaudiPage } from "../Pages/SaudiPage";
import fs from 'fs';


let page, context, browser, homepage;
test.beforeEach("Creating Page and navigating to home page", async() => {
    // browser = await chromium.launch({ args:['--start-maximized']});
    // context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: undefined });
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    homepage = new HomePage(page, context);
    await homepage.goToHomePage();
})

test.describe('Basic Functionality', async() => {
    test('Getting Link through Mobile', async() => {
        await homepage.getApplink();
    })

    test('Validating the CopyWright Symbol', async() => {
        await homepage.CopyWrightSymbol();
    })

    test('Validating the elements on the div', async() => {
        await homepage.validatingIcons();
    })

    test('Validating the Location', async() => {
        const newPage1 = await homepage.LocationHandler();
        const saudipage = new SaudiPage(newPage1);
        await saudipage.validatingIconsSaudi();
    })
})

test.describe('Cabs Test Cases', async() => {
    test("LOGO Verification", async()=>{
        await homepage.homePageLogoVerification();
    })

    test('From and To City',async()=>{
        await homepage.clickOnCabsMenu();

        const cabspage = new CabsPage(page);
        await cabspage.fromCitySelection();
        await cabspage.toCitySameAsFromCity();  
    })

    test("Visibility of Pickup Time in CabsPage", async()=>{
        await homepage.clickOnCabsMenu();
    
        const cabspage = new CabsPage(page);
        await cabspage.fromCitySelection();
        await cabspage.toCitySelection();
        await cabspage.dateSelection();
        await cabspage.pickupTimeSelection();
        const pickupTimeInput = await cabspage.timeDisplayedInCabsPages();
        await cabspage.searchButtonSelection();
    
        const suvcarpage = new SUVCarPage(page);
        const pickupTimeDisplayed = await suvcarpage.pickupTimeInCarPage();
        await expect(pickupTimeInput).toBe(pickupTimeDisplayed);
    })

    test('Booking cabs', async() => {
        await homepage.clickOnCabsMenu();
    
        const cabspage = new CabsPage(page);
        await cabspage.fromCitySelection();
        await cabspage.toCitySelection();
        await cabspage.dateSelection();
        await cabspage.pickupTimeSelection();
        await cabspage.searchButtonSelection();
    
        const suvcarpage = new SUVCarPage(page);
        try{
            await suvcarpage.suvCarSelection();
            await suvcarpage.carNamePrice();
        }
        catch(e){
            console.log('Oops! No cabs found');
            fs.writeFileSync("Outputs/CabResults.json",JSON.stringify({Cabs:'Oops! No cabs found'}, null, 2));
        }
    })
})

test.describe('Giftcard Test Cases', async() => {
    test('Fetching festival giftcards', async() => {
        const newPage = await homepage.clickOnGiftCardMenu();

        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.selectingFestivalsCategory();
    })

    test('URL validation', async() =>{
        const newPage = await homepage.clickOnGiftCardMenu();

        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.giftCardPageUrlChecking()
    })

    test('Validating available giftcards', async() => {
        const newPage = await homepage.clickOnGiftCardMenu();
    
        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.giftCardVisibility();
    })

    test('Sending the giftcard', async() => {
        const newPage = await homepage.clickOnGiftCardMenu();
    
        const giftcardpage = new GiftCardPage(newPage);
        await giftcardpage.giftCardSelection();
        await giftcardpage.recipientDetailsFilling(process.recipientName,process.recipientMobileNumber,process.recipientEmail);
        await giftcardpage.senderDetailsFilling(process.senderName,process.senderMobileNumber,process.senderEmail);
        await giftcardpage.errorMessageCapturing();
    })
})

test.describe("hotel test cases",async()=>{
    test("Check the hotel link is working",async()=>{
        await homepage.clickOnHotelsMenu();
    })
 
    test("Check the options available in room & guests",async()=>{
        await homepage.clickOnHotelsMenu();

        const hotelspage = new HotelsPage(page);
        await hotelspage.roomAndGuestsValidation();
    })

    test("Validating adults count",async()=>{
        await homepage.clickOnHotelsMenu();

        const hotelspage = new HotelsPage(page);
        await hotelspage.adultCount();
    })

    test('Checking adults selection in Hotels', async() =>{
        await homepage.clickOnHotelsMenu();
        const hotelspage = new HotelsPage(page);
        await hotelspage.guestsSelection();
    })

})

test.afterEach('Closing Page', async() => {
    await page.close();
    await context.close();
    await browser.close();
})