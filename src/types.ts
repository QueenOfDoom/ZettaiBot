import { Bot } from '@/client/Client';
import { Message } from 'discord.js';

export interface Config {
    token: string;
}

export enum PermLevel {
    BOT, PUBLIC, VETERAN, ADMIN, DEV
}

export interface CommandFunction {
    (client: Bot, message: Message, args: string[]): Promise<void>
}

export interface Command {
    name: string;
    description: string;
    permission: PermLevel;
    aliases?: string[];
    run: CommandFunction;
}

export interface EventFunction {
    (client: Bot, ...args: any[]): Promise<void>
}

export interface Event {
    name: string;
    run: EventFunction;
}
