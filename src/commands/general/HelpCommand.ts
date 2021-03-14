import { PermLevel, CommandFunction, Command } from '@/types';
import { Bot } from '@/client/Client';
import { getLevel } from '@/util/GeneralUtil';
import { Message } from 'discord.js';

export const run: CommandFunction = async (client: Bot, message: Message, args: string[]) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            let helpMessage = "";
            client.commands.each((command: Command) => {
                if(perm >= command.permission) {
                    helpMessage += `${command.name}: ${command.description}\n`;
                }
            });
            message.channel.send(helpMessage);
        }
    } else if(!message.author.bot) {
        // Send Help in DMs!
    } else {
        message.reply("Bots cannot call `help`!");
    }
}

export const name: string = "help";
export const permission: PermLevel = PermLevel.PUBLIC;
export const description: string = "The Help Command.";
export const aliases: string[] = ["?"];
