import { PermLevel, CommandFunction } from '@/types';
import { Bot } from '@/client/Client';
import { Message } from 'discord.js';
import { getLevel } from '@/util/GeneralUtil';
import { getConfigFromGuild } from '@/util/db/DBControl';

export const run: CommandFunction = async (client: Bot, message: Message) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            let conf = await getConfigFromGuild(message.guild!.id!);
            let msg = `Prefix: ${conf.prefix}\n` + 
                `Emote Tag: ${conf.emoteTag[0]}[emote]${conf.emoteTag[1]}!`;
            message.channel.send(msg);
        }
    } else {
        message.reply("You need to be in a guild to use this Command!");
    }
}

export const name: string = "get-config";
export const description: string = "Displays the Config";
export const permission: PermLevel = PermLevel.DEV;
