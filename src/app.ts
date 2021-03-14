import * as dotenv from 'dotenv';
import { Bot } from './client/Client';
import { Config } from './types';

// Initialize Config
dotenv.config();

let config: Config = {
    token: <string> process.env.token
};

let bot: Bot = new Bot();

bot.start(config);
