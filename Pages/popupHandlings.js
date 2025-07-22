exports.PopupHandlings = 
    class PopupHandlings{
        constructor(page){
            this.page = page;
            this.adInHomePage = page.locator(".styles__Close-sc-1bytt3z-0");
            this.login = page.locator("//span[@class='commonModal__close']");
            this.himachalCabPackage = page.getByAltText('Close');
            this.saudiLogin = page.locator('[data-cy="closeModal"]');
        }

        async advertisementPopup(){
            if(await this.adInHomePage.isVisible()){
                await this.adInHomePage.click();
            }
        }

        async loginPopup(){
            if(await this.login.isVisible()){
                await this.login.click();
            }
        }

        async himachalPopupHandling(){
            if(await this.himachalCabPackage.isVisible()){
                await this.himachalCabPackage.click();
            }
        }

        async saudiLoginHandling(){
            if(await this.saudiLogin.isVisible()){
                await this.saudiLogin.click()
            }
        }
    }