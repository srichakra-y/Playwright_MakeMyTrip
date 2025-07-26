exports.PopupHandlings = 
    class PopupHandlings{
        constructor(page){
            this.page = page;

            // Locator for advertisement popup close button on the homepage
            this.adInHomePage = page.locator(".styles__Close-sc-1bytt3z-0");

            // Locator for login modal close button
            this.login = page.locator("//span[@class='commonModal__close']");

            // Locator for Himachal cab package promotional popup close icon
            this.himachalCabPackage = page.getByAltText('Close');

            // Locator for Saudi-specific login popup close button
            this.saudiLogin = page.locator('[data-cy="closeModal"]');
        }

        // Close the advertisement popup if it's visible
        async advertisementPopup(){
            if(await this.adInHomePage.isVisible()){
                await this.adInHomePage.click();
            }
        }

        // Close the login popup if it's visible
        async loginPopup(){
            if(await this.login.isVisible()){
                await this.login.click();
            }
        }

        // Close the Himachal cab package popup if visible
        async himachalPopupHandling(){
            if(await this.himachalCabPackage.isVisible()){
                await this.himachalCabPackage.click();
            }
        }

        // Close the Saudi login modal if visible
        async saudiLoginHandling(){
            if(await this.saudiLogin.isVisible()){
                await this.saudiLogin.click()
            }
        }
    }