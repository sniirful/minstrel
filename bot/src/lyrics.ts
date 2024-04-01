import * as browserWrapper from './browser-wrapper';
import websiteTypes from './website-types';
import time from './time';

async function find(page: browserWrapper.Page, type: string): Promise<string | null> {
    // try catch because if any timeout occurs, the function
    // will throw and will not return anything; this way
    // we can make sure it returns null and gets handled properly
    try {
        switch (type) {
            case websiteTypes.YOUTUBE_MUSIC:
                return await findYouTubeMusic(page);
        }
    } catch { }
    return null;
}

async function findYouTubeMusic(page: browserWrapper.Page): Promise<string | null> {
    // TODO: wait for the page to fully load; puppeteer
    // does not provide a way to check if the page
    // has loaded or is still loading, so for now
    // we just wait for 2 seconds and hope it is enough
    await time.sleep(2000);

    // this function runs the code in the browser,
    // meaning the lyrics button is searched in the DOM
    // and clicked, telling us if it exists just in case
    let buttonFound = await page.evaluate((): boolean => {
        let lyricsButton = [...document.querySelectorAll('*')]
            .filter(element => element.innerHTML.trim() === 'Lyrics')[0] as HTMLElement | undefined;
        if (!lyricsButton) return false;

        lyricsButton.click();
        return true;
    });
    if (!buttonFound) return null;

    // this function runs the code in the browser as well,
    // and it returns null if the lyrics are not found;
    // otherwise, it returns the lyrics; the timeout is
    // set to 5 seconds, which is already enough
    await page.waitForSelector('ytmusic-description-shelf-renderer', { timeout: 5000 });
    let lyrics = await page.evaluate((): string | null => {
        // @ts-ignore
        let lyrics = document
            .querySelector('ytmusic-description-shelf-renderer')
            .querySelector('yt-formatted-string.non-expandable.description.style-scope.ytmusic-description-shelf-renderer');
        if (!lyrics) return null;

        // @ts-ignore
        return lyrics.innerText;
    });
    return lyrics;
}

export default {
    find,
};
