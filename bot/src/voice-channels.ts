import { Configuration } from './interfaces';
import _configuration from './configuration.json';
const configuration = _configuration as Configuration;

import discord from 'discord.js';
import members from './members';
import { lang } from './languages';

async function assertRequired(interaction: discord.ChatInputCommandInteraction | discord.ButtonInteraction): Promise<boolean> {
    if (!interaction.channel) {
        await interaction.reply(lang.command_invalid_interaction);
        return false;
    }
    if (!interaction.guild) {
        await interaction.reply(lang.command_invalid_interaction);
        return false;
    }

    let channel = members.get(interaction.guild, interaction.user.id)?.voice.channel;
    if (!channel) {
        await interaction.reply(lang.command_user_is_not_in_channel);
        return false;
    }

    // only check this if the allowed_channels property does actually
    // contain something. if nothing is there, then all channels are
    // allowed
    if (configuration.allowed_channels.length > 0 && !configuration.allowed_channels.includes(channel.id)) {
        await interaction.reply(lang.command_voice_channel_not_authorized);
        return false;
    }

    return true;
}

export default {
    assertRequired,
};
