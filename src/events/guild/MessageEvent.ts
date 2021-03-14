import { Bot } from '@/client/Client';
import { Command, EventFunction } from '@/types';
import { Message, TextChannel, Webhook } from 'discord.js';
import { getConfigFromGuild, getEmoji } from '@/util/db/DBControl';
import { escapeRegex } from '@/util/GeneralUtil';

export const run: EventFunction = async(client: Bot, message: Message) => {
    if(message.author.bot) {
        // Handle Bots
        return;
    }

    if(!message.guild) {
        // Handle DM's
        return;
    }
    
    let config = await getConfigFromGuild(message.guild!.id!);
    let prefix = config.prefix;
    let emoteTag = config.emoteTag;

    if(!message.content.toLowerCase().startsWith(prefix)) {
        let custom: string = `(${escapeRegex(emoteTag[0])}\\w+${escapeRegex(emoteTag[1])})`;
        let regex = new RegExp(`${custom}`, "g");
        let m: string = message.content; // I was just tired of typing this out...
        let match: number = 0;
        let response: string = "";
        let counter = 0;

        while((match = m.search(regex)) !== -1) {
            response += m.substring(0,match); // Pre
            m = m.substring(match+1);
            match = m.indexOf(emoteTag[1]);
            let emote = await getEmoji(m.substring(0,match));
            
            if(emote.startsWith("<")) {
                response += emote;
                counter++;
            } else {
                response += m.substring(0,match);
            }

            m = m.substring(match+1);
        }
        
        if(counter > 0) {
            response += m;
            let hook = await (<TextChannel> message.channel).createWebhook(message.member!.nickname || message.author.username, {
                    avatar: message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 512
                    })
            });
            await hook.send(response);
            hook.delete();
            message.delete();
        }
        return;
    }

    console.info(`${message.author.tag} issued "${message.content}".`);
    
    const args: string[] = message.content.slice(prefix.length)
        .trim().split(/ +/g);

    const keyword: string = args.shift() || "help";

    const command: Command = <Command> client.commands.get(keyword)
        || client.commands.get(client.aliases.get(keyword) || "help");

    if(!command) {
        // Handle "Command Not Found"!
        return;
    }

    command.run(client, message, args).catch((reason: any) => {
        message.channel.send(`An error occured:\n${reason}\n while trying to execute:` +
            `\n${message.content}`);
    });
}

export const name: string = 'message';
