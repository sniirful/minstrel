import discord from 'discord.js';
import music from './music';
import members from './members';
import { lang } from './languages';
import soundboard, { SOUNDBOARD_CUSTOM_ID_PREFIX } from './soundboard';
import voiceChannels from './voice-channels';
import search from './search';
import lyrics from './lyrics';

const interactionsNames = {
    PLAY: lang.command_play,
    STOP: lang.command_stop,
    PAUSE: lang.command_pause,
    RESUME: lang.command_resume,
    SOUNDBOARD: lang.command_soundboard,
};

const interactions = [
    {
        name: interactionsNames.PLAY,
        // if this property is set to true, then automatically:
        // - interaction.channel
        // - interaction.guild
        // - members.get(interaction.guild, interaction.user.id)?.voice.channel
        // all exist and are neither null nor undefined
        requiresVoiceChannel: true,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.PLAY)
            .setDescription(lang.command_play_description)
            .addSubcommand(subcommand => subcommand.setName(lang.command_play_youtube)
                .setDescription(lang.command_play_youtube_description)
                .addStringOption(option => option.setName(lang.command_play_youtube_url)
                    .setDescription(lang.command_play_youtube_url_description)
                    .setRequired(false))
                .addStringOption(option => option.setName(lang.command_play_youtube_title)
                    .setDescription(lang.command_play_youtube_title_description)
                    .setRequired(false)))
            .addSubcommand(subcommand => subcommand.setName(lang.command_play_youtubemusic)
                .setDescription(lang.command_play_youtubemusic_description)
                .addStringOption(option => option.setName(lang.command_play_youtubemusic_url)
                    .setDescription(lang.command_play_youtubemusic_url_description)
                    .setRequired(false))
                .addBooleanOption(option => option.setName(lang.command_play_youtubemusic_lyrics)
                    .setDescription(lang.command_play_youtubemusic_lyrics_description)
                    .setRequired(false))
                .addStringOption(option => option.setName(lang.command_play_youtubemusic_title)
                    .setDescription(lang.command_play_youtubemusic_title_description)
                    .setRequired(false))),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;
            let botChannel = (client.user?.id)
                ? (members.get(interaction.guild!!, client.user.id)?.voice.channel)
                : (null);

            if (botChannel != null && channel.id !== botChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            let url = interaction.options.getString(lang.command_play_youtube_url, false);
            let title = interaction.options.getString(lang.command_play_youtube_title, false);
            let showLyrics = interaction.options.getBoolean(lang.command_play_youtubemusic_lyrics, false);
            if (url === null && title === null) {
                await interaction.reply(lang.command_play_any_url_or_title_required);
                return;
            }

            await interaction.deferReply();
            let type = interaction.options.getSubcommand(true);
            if (url === null) {
                // here we can use the title since either url or
                // title is mandatory; if url is null, title is not
                url = await search.byWebsiteType(type, title!!);
            }
            if (!url) {
                await interaction.reply(lang.command_play_any_title_no_video_found);
                return;
            }
            let page = await music.play(channel, url, type);
            await interaction.editReply(`${lang.command_play_any_title_now_playing}${url}`);

            // this next part is only executed if the user
            // wants to see the lyrics
            if (!showLyrics) return;
            let textChannel = interaction.channel;
            if (!textChannel) return;

            // TODO FIX THE MESSAGES!!!
            let message = await textChannel.send(lang.command_play_youtubemusic_lyrics_searching);
            let foundLyrics = await lyrics.find(page, type);

            let messageText = (foundLyrics) ? (lang.command_play_youtubemusic_lyrics_found) : (lang.command_play_youtubemusic_lyrics_not_found);
            let files = (!foundLyrics) ? ([]) : ([{
                attachment: Buffer.from(foundLyrics, 'utf-8'),
                name: lang.command_play_youtubemusic_lyrics_filename,
            }]);

            await message.edit({
                content: messageText,
                files,
            });
        },
    },
    {
        name: interactionsNames.STOP,
        // if this property is set to true, then automatically:
        // - interaction.channel
        // - interaction.guild
        // - members.get(interaction.guild, interaction.user.id)?.voice.channel
        // all exist and are neither null nor undefined
        requiresVoiceChannel: true,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.STOP)
            .setDescription(lang.command_stop_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;
            let botChannel = (client.user?.id)
                ? (members.get(interaction.guild!!, client.user.id)?.voice.channel)
                : (null);

            if (botChannel != null && channel.id !== botChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            await music.stop(interaction.guild!!);
            await interaction.editReply(lang.command_done);
        },
    },
    {
        name: interactionsNames.PAUSE,
        // if this property is set to true, then automatically:
        // - interaction.channel
        // - interaction.guild
        // - members.get(interaction.guild, interaction.user.id)?.voice.channel
        // all exist and are neither null nor undefined
        requiresVoiceChannel: true,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.PAUSE)
            .setDescription(lang.command_pause_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;
            let botChannel = (client.user?.id)
                ? (members.get(interaction.guild!!, client.user.id)?.voice.channel)
                : (null);

            if (botChannel != null && channel.id !== botChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            music.pause(interaction.guild!!);
            await interaction.editReply(lang.command_done);
        },
    },
    {
        name: interactionsNames.RESUME,
        // if this property is set to true, then automatically:
        // - interaction.channel
        // - interaction.guild
        // - members.get(interaction.guild, interaction.user.id)?.voice.channel
        // all exist and are neither null nor undefined
        requiresVoiceChannel: true,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.RESUME)
            .setDescription(lang.command_resume_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;
            let botChannel = (client.user?.id)
                ? (members.get(interaction.guild!!, client.user.id)?.voice.channel)
                : (null);

            if (botChannel != null && channel.id !== botChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            music.resume(interaction.guild!!);
            await interaction.editReply(lang.command_done);
        },
    },
    {
        name: interactionsNames.SOUNDBOARD,
        // if this property is set to true, then automatically:
        // - interaction.channel
        // - interaction.guild
        // - members.get(interaction.guild, interaction.user.id)?.voice.channel
        // all exist and are neither null nor undefined
        requiresVoiceChannel: false,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.SOUNDBOARD)
            .setDescription(lang.command_soundboard_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            await interaction.deferReply();

            // we first get all the buttons inside one array
            let buttons: discord.ButtonBuilder[] = [];
            for (let soundboardItem of soundboard.getAll()) {
                buttons.push(new discord.ButtonBuilder()
                    .setCustomId(`${SOUNDBOARD_CUSTOM_ID_PREFIX}${soundboardItem.fullName}`)
                    .setLabel(soundboardItem.name)
                    .setStyle(discord.ButtonStyle.Secondary)
                );
                if (soundboardItem.emoji) {
                    buttons[buttons.length - 1].setEmoji(soundboardItem.emoji);
                }
            }

            // after that, we divide them up into different rows
            let rows: discord.ActionRowBuilder<discord.ButtonBuilder>[] = [];
            for (let i = 0; i < buttons.length; i++) {
                // 5 is the max amount of buttons a row can have
                if (i % 5 === 0) {
                    rows.push(new discord.ActionRowBuilder<discord.ButtonBuilder>());
                }

                rows[rows.length - 1].addComponents(buttons[i]);
            }

            // after that, we divide these rows into different messages
            let messagesContents: discord.ActionRowBuilder<discord.ButtonBuilder>[][] = [];
            for (let i = 0; i < rows.length; i++) {
                // each message can have up to 5 rows
                if (i % 5 === 0) {
                    messagesContents.push([]);
                }

                messagesContents[messagesContents.length - 1].push(rows[i]);
            }

            // eventually, we print all the messages
            for (let messageContents of messagesContents) {
                interaction.channel?.send({
                    components: [...messageContents],
                });
            }

            await interaction.editReply(lang.command_done);
        },
    }
];

export default interactionsNames;
export function getAll(): typeof interactions {
    return interactions;
}
export async function execute(client: discord.Client, interaction: discord.ChatInputCommandInteraction) {
    let i = interactions.find(i => i.name === interaction.commandName);
    if (!i) return;

    if (i.requiresVoiceChannel) {
        if (!(await voiceChannels.assertRequired(interaction))) {
            return;
        }
    }
    await i.callback(client, interaction);
}
