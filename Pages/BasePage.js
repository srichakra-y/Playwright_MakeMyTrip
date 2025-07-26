// Import the PopupHandlings class which encapsulates different popup behaviors
import { PopupHandlings } from "./PopupHandlings";

exports.BasePage = 
    class BasePage{
        // Constructor receives the Playwright page instance and initializes the PopupHandlings instance
        constructor(page){
            this.page = page;
            this.popuphandlings = new PopupHandlings(page);
        }

        // closing advertisement-related popups
        async advertisementHandling(){
            await this.popuphandlings.advertisementPopup();
        }

        // Manages login popups that may interrupt page flow
        async loginHandling(){
            await this.popuphandlings.loginPopup();
        }

        // Specific popup handling logic for Himachal-related content 
        async himachalPopupHandling(){
            await this.popuphandlings.himachalPopupHandling();
        }

        // Handles login popups tailored to the Saudi page
        async saudiLoginPopupHandling(){
            await this.popuphandlings.saudiLoginHandling();
        }
    }