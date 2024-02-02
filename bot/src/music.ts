import discord from 'discord.js';
import puppeteer from 'puppeteer';
import { launch as launchBrowser, getStream as getPuppeteerStream } from 'puppeteer-stream';
import { Browser, Page } from 'puppeteer-stream/node_modules/puppeteer-core';
import { Transform } from 'stream';
import * as discordVoice from '@discordjs/voice';
import cookies from './cookies';

let guilds: Record<string, {
    channel: discord.VoiceBasedChannel,
    connection: discordVoice.VoiceConnection,
    player: discordVoice.AudioPlayer,
    page: Page,
    stream: Transform,
}> = {};

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

async function getStream(url: string, websiteType: string): Promise<{
    page: Page,
    stream: Transform,
}> {
    let page = await browser.newPage();
    await page.setCookie(...(cookies.getByWebsiteType(websiteType)));
    await page.goto(url);

    return {
        page,
        stream: await getPuppeteerStream(page, { audio: true, video: false }),
    };
}

async function play(channel: discord.VoiceBasedChannel, url: string, websiteType: string) {
    let guild = channel.guild;

    // if it is already playing, stop everything
    if (guilds[guild.id]) {
        await stopGently(channel.guild);
    }

    let connection = discordVoice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    connection.on('error', async err => {
        // TODO
        await stop(channel.guild);
    });

    let player = discordVoice.createAudioPlayer();
    player.on('error', async err => {
        // TODO
        await stop(channel.guild);
    });

    let { page, stream } = await getStream(url, websiteType);
    let resource = discordVoice.createAudioResource(stream);
    resource.playStream.on('error', async err => {
        // TODO
        await stop(channel.guild);
    });

    player.play(resource);
    connection.subscribe(player);

    guilds[guild.id] = {
        channel,
        connection,
        player,
        page,
        stream,
    };
}

async function stopGently(guild: discord.Guild) {
    guilds[guild.id].player.stop(true);
    await guilds[guild.id].page.close();
}

async function stop(guild: discord.Guild) {
    guilds[guild.id].player.stop(true);
    guilds[guild.id].connection.destroy();
    await guilds[guild.id].page.close();

    delete guilds[guild.id];
}

function pause(guild: discord.Guild) {
    guilds[guild.id].player.pause();
}

function resume(guild: discord.Guild) {
    guilds[guild.id].player.unpause();
}

function getActiveChannel(guild: discord.Guild): discord.VoiceBasedChannel | null {
    if (!guilds[guild.id]) return null;
    return guilds[guild.id].channel;
}

export default {
    play,
    stop,
    pause,
    resume,
    getActiveChannel,
};
