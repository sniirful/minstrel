import puppeteer from 'puppeteer';
import { launch as launchBrowser, getStream as getPuppeteerStream } from 'puppeteer-stream';
import { Browser, Page } from 'puppeteer-stream/node_modules/puppeteer-core';
import cookies from './cookies';
import parser from 'node-html-parser';

// initialize the browser
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

async function youtube(title: string): Promise<string | null> {
    let page = await browser.newPage();
    await page.setCookie(...(cookies.getByWebsiteType('youtube')));
    await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`);

    let document = parser.parse(await page.content());
    let href = document.querySelector('ytd-video-renderer')?.querySelector('a')?.getAttribute('href');

    // no await in an attempt to be faster
    page.close();
    return (href)
        ? (`https://www.youtube.com${href}`)
        : (null);
}

export default {
    youtube,
};
