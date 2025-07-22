import { test, expect, chromium } from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { CabsPage } from "../Pages/cabsPage"
import { SUVCarPage } from "../Pages/SUVCarPage";
import { GiftCardPage } from "../Pages/GiftCardPage";
import { HotelsPage } from "../Pages/HotelsPage";
import process from "../Inputs/GiftCardInputValues.json";
import { SaudiPage } from "../Pages/SaudiPage";


let page, context, browser;
test.beforeEach("Creating Page", async() => {
    browser = await chromium.launch({ args:['--start-maximized']});
    context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    page = await context.newPage();
})

test.describe('Basic Functionality', async() => {
    test('Getting Link through Mobile', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.getApplink();
    })

    test('Validating the CopyWright Symbol', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.CopyWrightSymbol();
    })

    test('Validating the elements on the div', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.validatingIcons();
    })

    test('Validating the Location', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        const newPage1 = await homepage.LocationHandler();
        const saudipage = new SaudiPage(newPage1);
        await saudipage.validatingIconsSaudi();
    })
})

test.describe('Cabs Test Cases', async() => {
    test("LOGO Verification", async()=>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.homePageLogoVerification();
    })

    test('From and To Date',async()=>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.clickOnCabsMenu();

        const cabspage = new CabsPage(page);
        await cabspage.fromCitySelection();
        await cabspage.toCitySameAsFromCity();  
    })

    test("Visibility of Pickup Time in CabsPage", async()=>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
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
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.clickOnCabsMenu();
    
        const cabspage = new CabsPage(page);
        await cabspage.fromCitySelection();
        await cabspage.toCitySelection();
        await cabspage.dateSelection();
        await cabspage.pickupTimeSelection();
        await cabspage.searchButtonSelection();
    
        const suvcarpage = new SUVCarPage(page);
        await suvcarpage.suvCarSelection();
        await suvcarpage.carNamePrice();
    })
})

test.describe('Giftcard Test Cases', async() => {
    test('Fetching festival giftcards', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        const newPage = await homepage.clickOnGiftCardMenu();

        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.selectingFestivalsCategory();
    })

    test('URL validation', async() =>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        const newPage = await homepage.clickOnGiftCardMenu();

        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.giftCardPageUrlChecking()
    })

    test('Validating available giftcards', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        const newPage = await homepage.clickOnGiftCardMenu();
    
        const giftcardpage = new GiftCardPage(newPage, context);
        await giftcardpage.giftCardVisibility();
    })

    test('Sending the giftcard', async() => {
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
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
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.clickOnHotelsMenu();
    })
 
    test("Check the options available in room",async()=>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.clickOnHotelsMenu();

        const hotelspage = new HotelsPage(page);
        await hotelspage.roomAndGuestsValidation();
    })

    test("Validating adults count",async()=>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
        await homepage.clickOnHotelsMenu();

        const hotelspage = new HotelsPage(page);
        await hotelspage.adultCount();
    })

    test('Checking adults selection in Hotels', async() =>{
        const homepage = new HomePage(page, context);
        await homepage.goToHomePage();
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