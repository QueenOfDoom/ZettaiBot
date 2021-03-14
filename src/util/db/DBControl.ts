import { mongoose } from '@typegoose/typegoose';
import { TextChannel } from 'discord.js';
import { EmoteModel, GuildModel, Config, Emote } from '@/models';

export function connect() {
    mongoose.connect(<string> process.env.dburi, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}

// Add findEmoji(animated, name, identifier)

// Add parseMessage(). Converts Message with Zettai-moji's to
// regular Emoji's.

export async function clearEmojis() {
    let query = await EmoteModel.deleteMany( {} );
}

export async function addEmoji(animated: boolean, name: string, identifier: string, server: string, channel: TextChannel | null) {
    let emote = `<${animated ? 'a' : ''}:${name}:${identifier}>`;
    let query = await EmoteModel.findOne({ animated: animated, name: name, identifier: identifier, server: server }).exec();
    if(!query) {
        let document = await EmoteModel.create({
            animated: animated,
            name: name,
            identifier: identifier,
            server: server
        });
        if(channel) channel.send(`Successfully added ${emote}!`);
    } else {
        if(channel) channel.send(`${emote} already exists!`);
    }
}

export async function getEmoji(fullName: string) {
    let emoji = await EmoteModel.findOne({ name: fullName }).exec();
    if(emoji) { // Emote found
        let guild = await GuildModel.findOne({ identifier: emoji.server }).exec();
        if(guild) { // Guild joined
            let text = `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.identifier}>`;
            return text;
        } else {
            return `Your Emoji is in another castle!`;
        }
    } else {
        return `Emoji not found!`;
    }
}

export async function getAllEmojis() {
    let emojis = <Emote[]> (await EmoteModel.find({}).exec());
    let result: string[] = [];
    emojis.forEach(emoji => result.push(emoji.name));
    return result;
}

export async function addGuild(identifier: string) {
    let query = await GuildModel.findOne({ identifier: identifier }).exec();
    if(!query) {
        let document = await GuildModel.create({
            identifier: identifier,
            config: {
                prefix: '^',
                emoteTag: ['<', '>']
            }
        });
    }
}

export async function removeGuild(identifier: string) {
    let query = await GuildModel.findOneAndDelete({ identifier: identifier });
    console.log(`Successfully removed 1 Guild from DB!`);
}

// Assumes that server with `identifier` is already configured!
// If not... we're fucked :shrug:
export async function getConfigFromGuild(identifier: string): Promise<Config> {
    let query = await GuildModel.findOne({ identifier: identifier }).exec();
    return query!.config;
}

export async function setGuildConfig(server: string, config: Config) {
    let query = await GuildModel.findOneAndUpdate(
        { identifier: server }, 
        { config: config }
    ).exec();
}

