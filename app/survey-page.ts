import { NavigatedData, Page, Frame, Observable, alert } from '@nativescript/core';

export class SurveyViewModel extends Observable {
    constructor() {
        super();
        this.set("ownerName", "");
        this.set("ownerMobile", "");
        this.set("houseNumber", "");
        this.set("street", "");
        this.set("locality", "");
        this.set("city", "");
        this.set("state", "");
        this.set("pincode", "");
        this.set("maidName", "");
        this.set("maidMobile", "");
        this.set("isPunctualChecked", false);
        this.set("isCleanlinessChecked", false);
        this.set("isBehaviorChecked", false);
        this.set("isPayDemandChecked", false);
        
        // Add validation states
        this.set("ownerNameError", false);
        this.set("ownerMobileError", false);
        this.set("addressError", false);
        this.set("maidNameError", false);
        this.set("maidMobileError", false);
        this.set("reasonError", false);
    }

    togglePunctual() {
        this.set("isPunctualChecked", !this.get("isPunctualChecked"));
        this.set("reasonError", false);
    }

    toggleCleanliness() {
        this.set("isCleanlinessChecked", !this.get("isCleanlinessChecked"));
        this.set("reasonError", false);
    }

    toggleBehavior() {
        this.set("isBehaviorChecked", !this.get("isBehaviorChecked"));
        this.set("reasonError", false);
    }

    togglePayDemand() {
        this.set("isPayDemandChecked", !this.get("isPayDemandChecked"));
        this.set("reasonError", false);
    }

    validateForm() {
        let isValid = true;
        
        // Reset all error states
        this.set("ownerNameError", false);
        this.set("ownerMobileError", false);
        this.set("addressError", false);
        this.set("maidNameError", false);
        this.set("maidMobileError", false);
        this.set("reasonError", false);

        // Validate Owner Name
        if (!this.get("ownerName")) {
            this.set("ownerNameError", true);
            isValid = false;
        }

        // Validate Owner Mobile
        if (!this.get("ownerMobile")) {
            this.set("ownerMobileError", true);
            isValid = false;
        }

        // Validate Address Fields
        if (!this.get("houseNumber") || !this.get("street") || 
            !this.get("locality") || !this.get("city") || 
            !this.get("state") || !this.get("pincode")) {
            this.set("addressError", true);
            isValid = false;
        }

        // Validate at least one reason is selected
        if (!this.get("isPunctualChecked") && !this.get("isCleanlinessChecked") && 
            !this.get("isBehaviorChecked") && !this.get("isPayDemandChecked")) {
            this.set("reasonError", true);
            isValid = false;
        }

        // Validate Maid Name
        if (!this.get("maidName")) {
            this.set("maidNameError", true);
            isValid = false;
        }

        // Validate Maid Mobile
        if (!this.get("maidMobile")) {
            this.set("maidMobileError", true);
            isValid = false;
        }

        return isValid;
    }
}

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SurveyViewModel();
}

export function onSubmit(args) {
    const page = <Page>args.object;
    const vm = page.bindingContext;
    
    if (vm.validateForm()) {
        Frame.topmost().navigate({
            moduleName: "thank-you-page",
            clearHistory: true,
            transition: {
                name: "slide"
            }
        });
    } else {
        alert({
            title: "Required Fields",
            message: "Please fill in all required fields highlighted in red.",
            okButtonText: "OK"
        });
    }
}