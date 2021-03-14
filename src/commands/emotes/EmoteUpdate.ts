import { CommandFunction, PermLevel } from '@/types';
import { addEmoji, clearEmojis } from '@/util/db/DBControl';
import { getLevel } from '@/util/GeneralUtil';
import { Bot } from '@/client/Client';
import { Message, GuildMember, TextChannel } from 'discord.js';

export const run: CommandFunction = async(client: Bot, message: Message) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            await clearEmojis();
            client.guilds.cache.every(guild => {
                guild.emojis.cache.every(emoji => {
                    addEmoji(emoji.animated, emoji.name, emoji.id, guild.id, null);
                    console.log(`Force Updated '${emoji.name}' from '${guild.name}'!`);
                    return true;
                });
                return true;
            });
        }
    }
}

export const name: string = 'emote-update';
export const aliases: string[] = ["emoji-update"];
export const description: string = 'Updates all Emotes!';
export const permission: PermLevel = PermLevel.VETERAN;
