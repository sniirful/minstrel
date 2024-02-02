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
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.PLAY)
            .setDescription(lang.command_play_description)
            .addSubcommand(subcommand => subcommand.setName('youtube')
                .setDescription(lang.command_play_youtube_description)
                .addStringOption(option => option.setName('url')
                    .setDescription(lang.command_play_youtube_url_description)
                    .setRequired(true))),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
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

            let activeChannel = music.getActiveChannel(interaction.guild);
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
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.STOP)
            .setDescription(lang.command_stop_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
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

            let activeChannel = music.getActiveChannel(interaction.guild);
            if (activeChannel != null && channel.id !== activeChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            await music.stop(interaction.guild);
            await interaction.editReply(lang.command_done);
        },
    },
    {
        name: interactionsNames.PAUSE,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.PAUSE)
            .setDescription(lang.command_pause_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
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

            let activeChannel = music.getActiveChannel(interaction.guild);
            if (activeChannel != null && channel.id !== activeChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            music.pause(interaction.guild);
            await interaction.editReply(lang.command_done);
        },
    },
    {
        name: interactionsNames.RESUME,
        slash: new discord.SlashCommandBuilder()
            .setName(interactionsNames.RESUME)
            .setDescription(lang.command_resume_description),
        callback: async (client: discord.Client, interaction: discord.ChatInputCommandInteraction) => {
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

            let activeChannel = music.getActiveChannel(interaction.guild);
            if (activeChannel != null && channel.id !== activeChannel.id) {
                await interaction.reply(lang.command_user_is_not_in_bot_channel);
                return;
            }

            await interaction.deferReply();
            music.resume(interaction.guild);
            await interaction.editReply(lang.command_done);
        },
    }
];

export default interactionsNames;
export function getAll(): typeof interactions {
    return interactions;
}
export async function execute(client: discord.Client, interaction: discord.ChatInputCommandInteraction) {
    await interactions.find(i => i.name === interaction.commandName)?.callback(client, interaction);
}
