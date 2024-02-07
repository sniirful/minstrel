import puppeteer from 'puppeteer';
import { launch as launchBrowser, getStream as getPuppeteerStream } from 'puppeteer-stream';
import { Browser, Page } from 'puppeteer-stream/node_modules/puppeteer-core';
import { Transform } from 'stream';

let browser: Browser;
(async () => {
    browser = await launchBrowser({
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        headless: false,
        executablePath: puppeteer.executablePath(),
        args: ['--no-sandbox'],
    });
})();

// doing it this way, there will only be one browser
// and everyone will use just that
async function getBrowser(): Promise<Browser> {
    return browser;
}

export {
    getBrowser,
    getPuppeteerStream,
    Browser,
    Page,
    Transform,
};
