import configuration from './configuration';
import discord from 'discord.js';
import guilds from './guilds';
import { getAll as getAllCommandInteractions } from './command-interactions';

async function initializeCommandInteractions(client: discord.Client) {
    let commands: discord.RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    let interactions = getAllCommandInteractions();
    for (let i in interactions) {
        let interaction = interactions[i];
        commands.push(interaction.slash.toJSON());
    }

    let rest = new discord.REST().setToken(configuration.token);
    for (let guild of guilds.getAll(client)) {
        await rest.put(
            discord.Routes.applicationGuildCommands(configuration.client_id, guild.id),
            { body: commands },
        );
    }
}

export default {
    initializeCommandInteractions,
};
