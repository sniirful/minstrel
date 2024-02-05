import configuration from './configuration';
import discord from 'discord.js';
import { execute as executeCommandInteraction } from './command-interactions';
import { execute as executeButtonInteraction } from './button-interactions';
import interactions from './interactions';

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildVoiceStates] });

// wait for interactions, that is button clicks or commands
client.on('interactionCreate', async interaction => {
    try {
        if (interaction.isButton()) {
            await executeButtonInteraction(client, interaction);
        } else if (interaction.isChatInputCommand()) {
            await executeCommandInteraction(client, interaction);
        }
    } catch { }
});

client.on('guildCreate', () => {
    // when the bot joins a new server, refresh the commands
    // so they appear in the newly joined server as well
    interactions.initializeCommandInteractions(client);
});

// execute code once the client logs in
client.once(discord.Events.ClientReady, main);
client.login(configuration.token);

async function main() {
    interactions.initializeCommandInteractions(client);
}
