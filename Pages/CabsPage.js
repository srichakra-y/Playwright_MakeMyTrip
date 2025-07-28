// Import input values for cab selection from external JSON
import process from "../Inputs/CabsInputValues.json";

exports.CabsPage = 
    class CabsPage{
        constructor(page){

            this.page = page;

             // Locators for 'From' city input
            this.fromCity = page.locator("#fromCity");
            this.fromCitySearchBar = page.getByPlaceholder("From");
            this.fromCityOption = page.locator("#react-autowhatever-1-section-0-item-0");

            // Locators for 'To' city input
            this.toCitySearchBar = page.getByPlaceholder("To");
            this.toCityOption = page.locator("#react-autowhatever-1-section-0-item-0");

            // Locators for date selection
            this.dateOption = page.locator(".csw_inputBox.dates").nth(0);
            this.date = new Date().getDate();
            this.selectingDate = page.locator(`//div[@class='DayPicker-wrapper']/div[2]/div[1]/div[3]/div/div[normalize-space(text())='${this.date+2}']`);

            // Locators for pickup time selection
            this.pickupTimeOption = page.locator(".selectedTime");
            this.pickupHourSelection = page.locator(".hrSlotItemParent").nth(6)
            this.pickupMinutesSelection = page.locator(".minSlotItemParent").nth(6);
            this.pickupMeridianSelection = page.locator(".meridianSlotItemParent").nth(0);
            this.pickupApplyButton = page.locator(".applyBtnText");

            // Search button locator
            this.searchButton = page.getByRole('link', {name:'Search'});

            // Locator to verify pickup time after search
            this.pickupTimeDisplayed = page.locator('.code.font30');

            // Error message and screenshot locator when 'From' and 'To' cities are the same
            this.placesErrorField = page.locator(".redText.errorMsgText");
            this.placesErrorImage = page.locator(".csw.outstationOneway");
        }

        // Method to select 'From' city
        async fromCitySelection(){
            await this.fromCity.click();
            await this.fromCitySearchBar.type(process.From);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li");
            await this.fromCityOption.click();
        }

        // Method to select 'To' city
        async toCitySelection(){
            await this.toCitySearchBar.type(process.To);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li")
            await this.toCityOption.click();
        }

        // Method to select pickup time
        async dateSelection(){
            await this.dateOption.click();
            await this.selectingDate.click();
        }

        // Method to select pickup time
        async pickupTimeSelection(){
            await this.pickupTimeOption.click();
            await this.pickupHourSelection.click();
            await this.pickupMinutesSelection.click();
            await this.pickupMeridianSelection.click();
            await this.pickupApplyButton.click();
        }

        // Capture and return displayed pickup time after search
        async timeDisplayedInCabsPages(){
            const textDisplayed = await this.pickupTimeDisplayed.textContent();
            return textDisplayed;
        }

         // Click the search button to proceed with cab search
        async searchButtonSelection(){
            await this.searchButton.click();
        }

        // Validate error when 'From' and 'To' cities are the same
        async toCitySameAsFromCity(){   
            await this.toCitySearchBar.type(process.From);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li");
            await this.toCityOption.click();

            // Wait for error message to appear
            await this.page.waitForSelector(".redText.errorMsgText");
            const errorMessage=await this.placesErrorField.textContent();

            // Capture screenshot of the error layout
            await this.placesErrorImage.screenshot({path:"screenshots/PlacesError.png"});
            console.log("Error:",errorMessage); 
        }
    }