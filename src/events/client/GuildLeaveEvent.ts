import { EventFunction } from '@/types';
import { Bot } from '@/client/Client';
import { removeGuild } from '@/util/db/DBControl';
import { Guild } from 'discord.js';

export const run: EventFunction = async (client: Bot, guild: Guild) => {
    removeGuild(guild.id);
}

export const name: string = "guildDelete";
