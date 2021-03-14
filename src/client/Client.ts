import * as glob from 'glob'; 
import { promisify } from 'util';
import { Client, Intents, Collection } from 'discord.js';

import { Config, Command, Event } from '@/types';

const globPromise = promisify(glob);

class Bot extends Client {
    public config!: Config;
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public events: Collection<string, Event> = new Collection();

    public constructor() {
        super({
            ws: { intents: Intents.ALL },
            messageCacheLifetime: 180,
            messageCacheMaxSize: 200,
            messageEditHistoryMaxSize: 200,
            messageSweepInterval: 180
        });
    }

    public async start(config: Config): Promise<void> {
        this.config = config;
        this.login(config.token);

        // Command Collection
        const commandFiles: string[] = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
        commandFiles.map(async(value: string) => {
            const file: Command = await import(value);
            this.commands.set(file.name, file);
            if(file.aliases?.length) {
                file.aliases.map((value: string) => this.aliases.set(value, file.name));
            }
        });

        // Event Collection
        const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
        eventFiles.map(async(value: string) => {
            const file: Event = await import(value);
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
        });
    }
}

export { Config, Bot };
