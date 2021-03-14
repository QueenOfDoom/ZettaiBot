import { Bot } from '@/client/Client';
import { EventFunction } from '@/types';
import { connect, isRegistered, addGuild, addEmoji } from '@/util/db/DBControl';

export const run: EventFunction = async(client: Bot) => {
    console.log(`${client!.user!.tag} is now online!`);
    connect(); // Connects to MongoDB

    // Goes through all Servers and checks configs!
    client.guilds.cache.every(guild => {
        if(guild.available) {
            if(!isRegistered(guild.id)) { 
                addGuild(guild.id);
                guild.emojis.cache.every(emoji => {
                    addEmoji(emoji.animated, emoji.name, emoji.id, guild.id, null);
                    console.log(`Added '${emoji.name}' from '${guild.name}'!`);
                    return true;
                });
            }
        }
        return true;
    });

}

export const name: string = 'ready';
