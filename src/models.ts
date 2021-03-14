import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { Webhook } from 'discord.js';

// Emote's - stored in a Global Collection
class Emote {
    @prop({ required: true })
    public animated!: boolean;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public identifier!: string;

    @prop({ required: true })
    public server!: string;
}
const EmoteModel = getModelForClass(Emote);

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Config {
    @prop({ required: true })
    public prefix!: string;

    @prop({ required: true })
    public emoteTag!: string[];
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Guild {
    @prop({ required: true })
    public identifier!: string;

    @prop({ required: true })
    public config!: Config;
}
const GuildModel = getModelForClass(Guild);

export { EmoteModel, GuildModel };
export { Emote, Config };
