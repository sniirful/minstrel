import fs from 'fs';
import path from 'path';
import websiteTypes from './website-types';

function getByWebsiteType(type: string): any {
    switch (type) {
        case websiteTypes.YOUTUBE:
            return getYouTubeCookies();
    }
    return null;
}

function getYouTubeCookies(): any {
    let cookies = fs.readFileSync(path.join(__dirname, 'cookies/youtube.json'), { encoding: 'utf-8' });
    return JSON.parse(cookies);
}

export default {
    getByWebsiteType,
    getYouTubeCookies,
};
