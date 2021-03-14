import { EventFunction } from '@/types';
import { Bot } from '@/client/Client';
import { addGuild, addEmoji } from '@/util/db/DBControl';
import { Guild } from 'discord.js';

export const run: EventFunction = async (client: Bot, guild: Guild) => {
    if(guild.available) {
        addGuild(guild.id);
        guild.emojis.cache.every(emoji => {
            addEmoji(emoji.animated, emoji.name, emoji.id, guild.id, null);
            console.log(`Added '${emoji.name}' from '${guild.name}'!`);
            return true;
        });
    }
}

export const name: string = "guildCreate";
