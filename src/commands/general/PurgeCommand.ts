import { PermLevel, CommandFunction } from '@/types';
import { Bot } from '@/client/Client';
import { Message, TextChannel } from 'discord.js';
import { getLevel } from '@/util/GeneralUtil';

export const run: CommandFunction = async (client: Bot, message: Message, args: string[]) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            if(args.length === 1) {
                let num = Number.parseInt(args[0]);
                if(num === NaN) {
                    message.channel.send(`${args[0]} ain't a number my dude!`);
                } else {
                    (<TextChannel> message.channel).bulkDelete(num);
                }
            } else {
                message.channel.send(`Invalid Syntax!`);
            }
        } else {
            message.channel.send(`Insufficient Permissions!`);
        }
    } 
}

export const name: string = "purge";
export const description: string = "The Great Purge";
export const permission: PermLevel = PermLevel.ADMIN;
