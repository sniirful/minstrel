import configuration from './configuration';
import fs from 'fs';
import path from 'path';

interface Language {
    command_play: string;
    command_stop: string;
    command_pause: string;
    command_resume: string;
    command_soundboard: string;
    command_play_description: string;
    command_play_youtube_description: string;
    command_play_youtube_url_description: string;
    command_stop_description: string;
    command_pause_description: string;
    command_resume_description: string;
    command_soundboard_description: string;
    command_invalid_interaction: string;
    command_user_is_not_in_channel: string;
    command_user_is_not_in_bot_channel: string;
    command_voice_channel_not_authorized: string;
    command_done: string;
}

let lang: Language;
function initializeLanguage() {
    let filename = `${configuration.language}.json`;
    let filepath = path.join(__dirname, 'languages', filename);
    // if the chosen language does not exist, default to
    // english us
    if (!fs.existsSync(filepath)) {
        configuration.language = 'enUS';
        initializeLanguage();
        return;
    }

    let languageContent = fs.readFileSync(filepath, { encoding: 'utf-8' });
    lang = JSON.parse(languageContent);
}

initializeLanguage();
export { lang };
