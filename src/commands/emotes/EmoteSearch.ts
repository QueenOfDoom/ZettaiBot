import { CommandFunction, PermLevel } from '@/types';
import { getEmoji } from '@/util/db/DBControl';
import { getLevel } from '@/util/GeneralUtil';
import { Bot } from '@/client/Client';
import { Message, GuildMember, TextChannel } from 'discord.js';

export const run: CommandFunction = async(client: Bot, message: Message, args: string[]) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            if(args.length === 1) {
                let msg = await getEmoji(args[0]);
                message.reply(msg);
            } else {
                message.reply(`Incorrect Syntax!\n` + 
                    `Try: ${name} [emojiName]`);
            }
        }
    }
}

export const name: string = 'emote-search';
export const aliases: string[] = ["emoji-search"];
export const description: string = 'Searches for an Emote into a Database!';
export const permission: PermLevel = PermLevel.PUBLIC;
