import { Bot } from '@/client/Client';
import { EventFunction } from '@/types';
import { connect } from '@/util/db/DBControl';

export const run: EventFunction = async(client: Bot) => {
    console.log(`${client!.user!.tag} is now online!`);
    connect(); // Connects to MongoDB
}

export const name: string = 'ready';
