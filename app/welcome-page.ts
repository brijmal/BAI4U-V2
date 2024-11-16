import { NavigatedData, Page } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
}

export function onGetStarted() {
    Frame.topmost().navigate({
        moduleName: "survey-page",
        clearHistory: false,
        transition: {
            name: "slide"
        }
    });
}