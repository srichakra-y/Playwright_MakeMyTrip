import { expect } from "@playwright/test";
import fs from "fs";

exports.GiftCardPage =
    class GiftCardPage{
        constructor(newPage,context){
            this.page = newPage;
            this.context = context;

            // Gift card-related locators
            this.weddingGiftCard = newPage.getByAltText('giftcard').nth(0);
            this.emailOption = newPage.locator('[data-cy="DeliveryModes_444"]').nth(1);

            // Recipient form fields
            this.recipientName = newPage.locator('input[name="name"]');            
            this.recipientMobileNumber = newPage.locator('input[name="mobileNo"]');
            this.recipientEmail = newPage.locator('input[name="emailId"]');

              // Sender form fields
            this.senderName = newPage.locator('input[name="senderName"]');
            this.senderMobileNumber = newPage.locator('input[name="senderMobileNo"]');
            this.senderEmail = newPage.locator('input[name="senderEmailId"]');

            // Purchase and error handling
            this.buyNowButton = newPage.getByRole('button',{name:'BUY NOW'});
            this.errorMessageImage = newPage.locator('.deliver__wrap').nth(1);
            this.errorField = newPage.locator('.red-text.font11');

             // Gift card visibility and category handling
            this.giftCards = newPage.locator('.card__data > img');
            this.festivalsOption = newPage.locator('label[for="Festivals"]');
            this.festivalGiftcards = newPage.locator('.card__details.text-center > h3');
        }

        // Select a gift card 
        async giftCardSelection(){
            await this.page.waitForLoadState('domcontentloaded');
            await this.weddingGiftCard.click();
        }

         // Fill in the recipient's delivery information
        async recipientDetailsFilling(name, number, email){
            await this.emailOption.scrollIntoViewIfNeeded();
            await this.emailOption.click();
            await this.recipientName.fill(name);
            await this.recipientMobileNumber.fill(number);
            await this.recipientEmail.fill(email)
        }

        // Fill in the sender's information
        async senderDetailsFilling(name, number, email){
            await this.senderName.fill(name);
            await this.senderMobileNumber.fill(number);
            await this.senderEmail.fill(email);
        }

        // Capture error message and save screenshot when BUY NOW is clicked
        async errorMessageCapturing(){
            await this.buyNowButton.click();
            await this.errorMessageImage.screenshot({path:'screenshots/GiftCardDetailsError.png'});
            const errorMessage = await this.errorField.textContent()
            console.log(errorMessage)
        }

        // Validate visibility of all displayed gift card images
        async giftCardVisibility(){
            await this.page.waitForSelector('.card__data > img', { state: 'visible' });
            const totalGiftCards = await this.giftCards.count();
            for(let i = 0; i < totalGiftCards; i++){
                const giftCardImage = await this.giftCards.nth(i);
                await expect(giftCardImage).toBeVisible();
            }
            console.log('All the available giftcards Validated');
        }

        // Verify that the current URL matches the expected gift card page
        async giftCardPageUrlChecking(){
            const url="https://www.makemytrip.com/gift-cards/";
            const newPageUrl=await this.page.url();
            expect(newPageUrl).toBe(url);
            console.log('URL of the giftcard page is validated successfully');
        }

        // Filter gift cards by the 'Festivals' category and log the card titles
        async selectingFestivalsCategory(){
            await this.festivalsOption.click();
            await this.page.waitForSelector('.card__details.text-center > h3', { state: 'visible' });
            const festivalGiftcardsCount = await this.festivalGiftcards.count();
            let festivalGiftCards = [];
            for(let i = 0; i < festivalGiftcardsCount; i++){
                const festivalGiftcardName = await this.festivalGiftcards.nth(i);
                festivalGiftCards.push(await festivalGiftcardName.textContent());
            }
            console.log(festivalGiftCards);

            // Save list of gift cards to output file
            fs.writeFileSync("Outputs/FestivalGiftCardResults.json",JSON.stringify({festivalGiftCards}, null , 2))
        }
    }