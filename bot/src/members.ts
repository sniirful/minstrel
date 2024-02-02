import discord from 'discord.js';

function getAll(guild: discord.Guild): discord.GuildMember[] {
    let members: discord.GuildMember[] = [];
    guild.members.cache.forEach(member => {
        members.push(member);
    });
    return members;
}

function get(guild: discord.Guild, userID: string): discord.GuildMember | null {
    for (let member of getAll(guild)) {
        if (member.user.id === userID) return member;
    }
    return null;
}

export default {
    getAll,
    get,
};