import { PermLevel, CommandFunction } from '@/types';
import { Bot } from '@/client/Client';
import { Message } from 'discord.js';
import { getLevel } from '@/util/GeneralUtil';
import { getConfigFromGuild, setGuildConfig } from '@/util/db/DBControl';

const validOptions = ["prefix", "emoteTag"];
export const run: CommandFunction = async (client: Bot, message: Message, args: string[]) => {
    if(message.member) {
        let perm: PermLevel = getLevel(message.member);
        if(perm >= permission) {
            if(args.length < 2) {
                message.reply("Invalid Syntax!\n Try: " + `\`${name} [option] [value]\`.\n` +
                    'For available options refer to the Documentation!');
            } else {
                let guildID = message.guild!.id!;
                let conf = await getConfigFromGuild(guildID);
                if(validOptions.indexOf(args[0]) === -1) {
                    message.reply(`${args[0]} is an invalid option!`);
                } else {
                    if(args[0] === "prefix") {
                        conf.prefix = args[1];
                    } else if(args[0] === "emoteTag") {
                        if(args.length === 2) {
                            conf.emoteTag = [args[1], args[1]];
                        } else if(args.length === 3) {
                            conf.emoteTag = [args[1], args[2]];
                        } else {
                            message.reply("Invalid Amount of Arguments.\n" +
                                "Expected: 2, Actual: " + args.length);
                            return;
                        }
                    }
                    setGuildConfig(guildID, conf);
                }
            }
        }
    }
}

export const name: string = "set-config";
export const description: string = "Sets a specific config option!";
export const permission: PermLevel = PermLevel.ADMIN;
