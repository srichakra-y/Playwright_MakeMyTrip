import { PopupHandlings } from "./PopupHandlings";

exports.BasePage = 
    class BasePage{
        constructor(page){
            this.page = page;
            this.popuphandlings = new PopupHandlings(page);
        }

        async advertisementHandling(){
            await this.popuphandlings.advertisementPopup();
        }

        async loginHandling(){
            await this.popuphandlings.loginPopup();
        }

        async himachalPopupHandling(){
            await this.popuphandlings.himachalPopupHandling();
        }

        async saudiLoginPopupHandling(){
            await this.popuphandlings.saudiLoginHandling();
        }
    }