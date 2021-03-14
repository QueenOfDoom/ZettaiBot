import { PermLevel, CommandFunction } from '@/types';
import { Bot } from '@/client/Client';
import { Message } from 'discord.js';
import { getLevel } from '@/util/GeneralUtil';
import { getConfigFromGuild } from '@/util/db/DBControl';

export const run: CommandFunction = async (client: Bot, message: Message) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            message.channel.send("<a:loliDance:779694465686306847>");
        }
    } else {
        message.reply("You need to be in a guild to use this Command!");
    }
}

export const name: string = "test";
export const description: string = "Command for testing features";
export const permission: PermLevel = PermLevel.DEV;
