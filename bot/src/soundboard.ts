import fs from 'fs';
import path from 'path';

interface SoundboardItem {
    emoji?: string;
    name: string;
    fullName: string;
}

export const SOUNDBOARD_CUSTOM_ID_PREFIX = 'soundboard-';
const SOUNDBOARD_DIRECTORY = '/soundboard';

function getAll(): SoundboardItem[] {
    let res: SoundboardItem[] = [];

    let allFiles = fs.readdirSync(SOUNDBOARD_DIRECTORY, { withFileTypes: false });
    for (let file of allFiles) {
        // casting the value of file to string only
        file = file as string;

        let nameWithEmoji = path.parse(file).name;
        // i have no clue what this does nor why this works
        // https://dev.to/melvin2016/how-to-check-if-a-string-contains-emojis-in-javascript-31pe
        let emoji = nameWithEmoji.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi)?.[0];
        if (!emoji) {
            res.push({
                name: nameWithEmoji,
                fullName: file,
            });
            continue;
        }

        let nameWithoutEmoji = nameWithEmoji.replace(emoji, '').trim();
        res.push({
            emoji,
            name: nameWithoutEmoji,
            fullName: file,
        });
    }

    return res;
}

function getPath(fileName: string): string {
    return path.join(SOUNDBOARD_DIRECTORY, fileName);
}

export default {
    getAll,
    getPath,
};
