import fs from 'fs';
import path from 'path';
import websiteTypes from './website-types';

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
    let cookies = (fs.existsSync(`/custom-cookies/${filename}.json`))
        ? fs.readFileSync(`/custom-cookies/${filename}.json`, { encoding: 'utf-8' })
        : fs.readFileSync(path.join(__dirname, 'cookies', `${filename}.json`), { encoding: 'utf-8' });
    return JSON.parse(cookies);
}

export default {
    getByWebsiteType,
};
