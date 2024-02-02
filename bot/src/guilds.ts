import discord from 'discord.js';

function getAll(client: discord.Client): discord.Guild[] {
    let guilds: discord.Guild[] = [];
    client.guilds.cache.forEach(guild => {
        guilds.push(guild);
    });
    return guilds;
}

export default {
    getAll,
};
