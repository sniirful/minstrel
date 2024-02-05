import discord from 'discord.js';
import soundboard, { SOUNDBOARD_CUSTOM_ID_PREFIX } from './soundboard';
import music from './music';
import members from './members';
import voiceChannels from './voice-channels';

const interactionsIDs = {
    CREATE_NEW_CHANNEL: 'button_create_new_channel',
};

const interactions: {
    id: string;
    requiresVoiceChannel: boolean;
    slash: discord.SlashCommandSubcommandsOnlyBuilder;
    callback: (client: discord.Client, interaction: discord.ButtonInteraction) => Promise<void>;
}[] = [];

const specialInteractions = {
    [SOUNDBOARD_CUSTOM_ID_PREFIX]: async (client: discord.Client, interaction: discord.ButtonInteraction, ) => {
        if (!(await voiceChannels.assertRequired(interaction))) {
            return;
        }
        let channel = members.get(interaction.guild!!, interaction.user.id)?.voice.channel!!;

        // the interaction custom id will come in the form of
        // "soundboard-" + "filename"
        let fileName = interaction.customId.replace(SOUNDBOARD_CUSTOM_ID_PREFIX, '');
        let filePath = soundboard.getPath(fileName);

        await music.playFromSoundboard(channel, filePath);
        await interaction.deferUpdate();
    },
};

async function executeSpecialInteraction(client: discord.Client, interaction: discord.ButtonInteraction): Promise<boolean> {
    if (interaction.customId.startsWith(SOUNDBOARD_CUSTOM_ID_PREFIX)) {
        await specialInteractions[SOUNDBOARD_CUSTOM_ID_PREFIX](client, interaction);
        return true;
    }

    return false;
}

export default interactionsIDs;
export function getAll(): typeof interactions {
    return interactions;
}
export async function execute(client: discord.Client, interaction: discord.ButtonInteraction) {
    if (await executeSpecialInteraction(client, interaction)) {
        return;
    }

    await interactions.find(i => i.id === interaction.customId)?.callback(client, interaction);
}
