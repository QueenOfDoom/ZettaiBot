import { EventFunction } from '@/types';
import { Bot } from '@/client/Client';
import { addGuild, addEmoji } from '@/util/db/DBControl';
import { Guild } from 'discord.js';

export const run: EventFunction = async (client: Bot, oldGuild: Guild, newGuild: Guild) => {
    if(newGuild.available) {
        console.log(`${newGuild.name} updated!`);
    }
}

export const name: string = "guildUpdate";
