import { Configuration } from './interfaces';
import _configuration from './configuration.json';
const configuration = _configuration as Configuration;

import discord from 'discord.js';
import music from './music';
import members from './members';
import { lang } from './languages';

const interactionsNames = {
    PLAY: lang.command_play,
    STOP: lang.command_stop,
    PAUSE: lang.command_pause,
    RESUME: lang.command_resume,
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
            .addSubcommand(subcommand => subcommand.setName('youtube')
                .setDescription(lang.command_play_youtube_description)
                .addStringOption(option => option.setName('url')
                    .setDescription(lang.command_play_youtube_url_description)
                    .setRequired(true))),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
            let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;

            let activeChannel = music.getActiveChannel(interaction.guild!!);
            if (activeChannel != null && channel.id !== activeChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            await music.play(channel, interaction.options.getString('url', true), interaction.options.getSubcommand(true));
            await interaction.editReply(lang.command_done);
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

            let activeChannel = music.getActiveChannel(interaction.guild!!);
            if (activeChannel != null && channel.id !== activeChannel.id) {
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

            let activeChannel = music.getActiveChannel(interaction.guild!!);
            if (activeChannel != null && channel.id !== activeChannel.id) {
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

            let activeChannel = music.getActiveChannel(interaction.guild!!);
            if (activeChannel != null && channel.id !== activeChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            music.resume(interaction.guild!!);
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
        if (!interaction.channel) {
            await interaction.reply(lang.command_invalid_interaction);
            return;
        }
        if (!interaction.guild) {
            await interaction.reply(lang.command_invalid_interaction);
            return;
        }

        let channel = members.get(interaction.guild, interaction.user.id)?.voice.channel;
        if (!channel) {
            await interaction.reply(lang.command_user_is_not_in_channel);
            return;
        }

        // only check this if the allowed_channels property does actually
        // contain something. if nothing is there, then all channels are
        // allowed
        if (configuration.allowed_channels.length > 0 && !configuration.allowed_channels.includes(channel.id)) {
            await interaction.reply(lang.command_voice_channel_not_authorized);
            return;
        }
    }
    await i.callback(client, interaction);
}
