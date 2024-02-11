import * as browserWrapper from './browser-wrapper';
import cookies from './cookies';
import parser from 'node-html-parser';
import websiteTypes from './website-types';

async function byWebsiteType(type: string, title: string): Promise<string | null> {
    switch (type) {
        case websiteTypes.YOUTUBE:
            return await youtube(title);
        case websiteTypes.YOUTUBE_MUSIC:
            return await youtubeMusic(title);
    }
    return null;
}

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

async function youtubeMusic(title: string): Promise<string | null> {
    let browser = await browserWrapper.getBrowser();
    let page = await browser.newPage();
    await page.setCookie(...(cookies.getByWebsiteType('youtubemusic')));
    await page.goto(`https://music.youtube.com/search?q=${encodeURIComponent(title)}`);

    await page.waitForNetworkIdle();
    let document = parser.parse(await page.content());
    let outerHTML = document.getElementsByTagName('ytmusic-shelf-renderer')[0] ?? null;
    let href = (outerHTML) ? (outerHTML.querySelector('a')?.getAttribute('href')) : (null);

    // no await in an attempt to be faster
    page.close();
    return (href)
        ? (`https://music.youtube.com/${href}`)
        : (null);
}

export default {
    byWebsiteType,
};
