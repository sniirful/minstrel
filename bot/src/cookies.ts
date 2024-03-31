import fs from 'fs';
import path from 'path';
import websiteTypes from './website-types';
import * as browserWrapper from './browser-wrapper';

async function track(page: browserWrapper.Page, filename: string) {
    // TODO: a dirty hack to save cookies every second
    // since puppeteer does not provide a way to detect
    // when cookies have changed
    setTimeout(async () => {
        let cookies = await page.cookies();
        fs.writeFileSync(getCustomCookiesFilename(filename), JSON.stringify(cookies));
    }, 1000);
}

function getByWebsiteType(type: string): any {
    switch (type) {
        case websiteTypes.YOUTUBE:
            return getYouTubeCookies();
        case websiteTypes.YOUTUBE_MUSIC:
            return getYouTubeMusicCookies();
    }
    return null;
}

function getYouTubeCookies(): any {
    return getCookies('youtube');
}

function getYouTubeMusicCookies(): any {
    return getCookies('youtube-music');
}

function getCookies(filename: string): any {
    let customCookiesFilename = getCustomCookiesFilename(filename);

    let cookies = (fs.existsSync(customCookiesFilename))
        ? fs.readFileSync(customCookiesFilename, { encoding: 'utf-8' })
        : fs.readFileSync(path.join(__dirname, 'cookies', `${filename}.json`), { encoding: 'utf-8' });
    return JSON.parse(cookies);
}

function getCustomCookiesFilename(filename: string): string {
    let customCookiesFilename = `/custom-cookies/${filename}.json`;
    // kept as comment for testing purposes
    // let customCookiesFilename = path.resolve(__dirname, `../../custom-cookies/${filename}.json`);

    return customCookiesFilename;
}

export default {
    getByWebsiteType,
    track,
};
