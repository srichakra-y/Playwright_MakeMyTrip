import process from "../Inputs/CabsInputValues.json";

exports.CabsPage = 
    class CabsPage{
        constructor(page){
            this.page = page;
            this.fromCity = page.locator("#fromCity");
            this.fromCitySearchBar = page.getByPlaceholder("From");
            this.fromCityOption = page.locator("#react-autowhatever-1-section-0-item-0");
            this.toCitySearchBar = page.getByPlaceholder("To");
            this.toCityOption = page.locator("#react-autowhatever-1-section-0-item-0");
            this.dateOption = page.locator(".csw_inputBox.dates").nth(0);
            const date = new Date().getDate();
            this.selectingDate = page.locator(`//div[@class='DayPicker-wrapper']/div[2]/div[1]/div[3]/div/div[normalize-space(text())='${date+3}']`);
            this.pickupTimeOption = page.locator(".selectedTime");
            this.pickupHourSelection = page.locator(".hrSlotItemParent").nth(6);
            this.pickupMinutesSelection = page.locator(".minSlotItemParent").nth(6);
            this.pickupMeridianSelection = page.locator(".meridianSlotItemParent").nth(0);
            this.pickupApplyButton = page.locator(".applyBtnText");
            this.searchButton = page.getByRole('link', {name:'Search'});
            this.pickupTimeDisplayed = page.locator('.code.font30');
            this.placesErrorField = page.locator(".redText.errorMsgText");
            this.placesErrorImage = page.locator(".csw.outstationOneway");
        }

        async fromCitySelection(){
            await this.fromCity.click();
            await this.fromCitySearchBar.type(process.From);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li");
            await this.fromCityOption.click();
        }

        async toCitySelection(){
            await this.toCitySearchBar.type(process.To);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li")
            await this.toCityOption.click();
        }

        async dateSelection(){
            // await this.dateOption.click();
            // const today = new Date();
            // const [currentYear, currentMonth, currentDate] = today.toISOString().split('T')[0].split('-');
            // const MonthEnum = {
            //     "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August",
            //     "09": "September", "10": "October", "11": "November", "12": "December"
            // };
            // const currentMonthName = MonthEnum[currentMonth];
            // for(let i=0; i < 11; i++){
            //     if(i===0){
            //         const [disMonth, disYear] = await this.displayedMonth.textContent().split(' ');
            //     }
            // }
            // await this.page.waitForLoadState('domcontentloaded');
            await this.dateOption.click();
            await this.selectingDate.click();
        }

        async pickupTimeSelection(){
            await this.pickupTimeOption.click();
            await this.pickupHourSelection.click();
            await this.pickupMinutesSelection.click();
            await this.pickupMeridianSelection.click();
            await this.pickupApplyButton.click();
        }

        async timeDisplayedInCabsPages(){
            const textDisplayed = await this.pickupTimeDisplayed.textContent();
            return textDisplayed;
        }

        async searchButtonSelection(){
            await this.searchButton.click();
        }

        async toCitySameAsFromCity(){   
            await this.toCitySearchBar.type(process.From);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector("//ul[@role='listbox']/li");
            await this.toCityOption.click();
            await this.page.waitForSelector(".redText.errorMsgText");
            const errorMessage=await this.placesErrorField.textContent();
            await this.placesErrorImage.screenshot({path:"screenshots/PlacesError.png"});
            console.log("Error:",errorMessage); 
        }
    }