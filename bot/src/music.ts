import discord from 'discord.js';
import * as browserWrapper from './browser-wrapper';
import * as discordVoice from '@discordjs/voice';
import cookies from './cookies';

let guilds: Record<string, {
    connection: discordVoice.VoiceConnection,
    player: discordVoice.AudioPlayer,
    page?: browserWrapper.Page,
    stream?: browserWrapper.Transform,
}> = {};

async function getStream(url: string, websiteType: string): Promise<{
    page: browserWrapper.Page,
    stream: browserWrapper.Transform,
}> {
    let browser = await browserWrapper.getBrowser();
    let page = await browser.newPage();
    let stream = await browserWrapper.getPuppeteerStream(page, { audio: true, video: false });

    await page.setCookie(...(cookies.getByWebsiteType(websiteType)));
    await page.goto(url);
    await cookies.track(page, websiteType);

    return {
        page,
        stream,
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
    // removing all listeners to avoid memory leaks
    // as discord may recycle the connection object
    connection.removeAllListeners();
    connection.on('error', async err => {
        // TODO
        await stop(channel.guild);
    });
    connection.on(discordVoice.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
        // https://discordjs.guide/voice/voice-connections.html#handling-disconnects
        try {
            await Promise.race([
                discordVoice.entersState(connection, discordVoice.VoiceConnectionStatus.Signalling, 5_000),
                discordVoice.entersState(connection, discordVoice.VoiceConnectionStatus.Connecting, 5_000),
            ]);
            // Seems to be reconnecting to a new channel - ignore disconnect
        } catch (error) {
            await stop(guild);
        }
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
        connection,
        player,
        page,
        stream,
    };
}

async function playFromSoundboard(channel: discord.VoiceBasedChannel, filePath: string) {
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

    let resource = discordVoice.createAudioResource(filePath);
    resource.playStream.on('error', async err => {
        // TODO
        await stop(channel.guild);
    });

    player.play(resource);
    connection.subscribe(player);

    guilds[guild.id] = {
        connection,
        player,
    };
}

async function stopGently(guild: discord.Guild) {
    // we want to avoid any errors that might
    // happen
    try {
        guilds[guild.id].player.stop(true);
        await guilds[guild.id].page?.close();
    } catch { }
}

async function stop(guild: discord.Guild) {
    // we want to avoid any errors that might
    // happen when trying to stop the player,
    // because for instance the destroy method
    // might be called twice and it will throw
    try {
        guilds[guild.id].player.stop(true);
        guilds[guild.id].connection.destroy();
        await guilds[guild.id].page?.close();

        delete guilds[guild.id];
    } catch { }
}

function pause(guild: discord.Guild) {
    // making sure that this cannot make the
    // bot crash
    try {
        guilds[guild.id].player.pause();
    } catch { }
}

function resume(guild: discord.Guild) {
    // making sure that this cannot make the
    // bot crash
    try {
        guilds[guild.id].player.unpause();
    } catch { }
}

export default {
    play,
    playFromSoundboard,
    stop,
    pause,
    resume,
};
