import * as browserWrapper from './browser-wrapper';
import cookies from './cookies';
import parser from 'node-html-parser';

async function youtube(title: string): Promise<string | null> {
    let browser = await browserWrapper.getBrowser();
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
