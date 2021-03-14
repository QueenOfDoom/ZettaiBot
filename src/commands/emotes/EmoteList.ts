import { CommandFunction, PermLevel } from '@/types';
import { getAllEmojis } from '@/util/db/DBControl';
import { getLevel } from '@/util/GeneralUtil';
import { Bot } from '@/client/Client';
import { Message, GuildMember, TextChannel } from 'discord.js';

export const run: CommandFunction = async(client: Bot, message: Message, args: string[]) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            let names: string[] = await getAllEmojis();
            message.channel.send(names.join(', '));
        }
    }
}

export const name: string = 'emote-list';
export const aliases: string[] = ["emoji-list"];
export const description: string = 'Lists all the emotes in the Database!';
export const permission: PermLevel = PermLevel.PUBLIC;
