import { GuildMember } from 'discord.js';
import { PermLevel } from '@/types';

export function getLevel(user: GuildMember) {
    if(user.user.bot) {
        return PermLevel.BOT;
    } else if(user.user.id === '756757056941326397') {
        return PermLevel.DEV;
    } else if(user.hasPermission('ADMINISTRATOR')) {
        return PermLevel.ADMIN;
    } else if(user.roles.cache.array().length === 0) {
        return PermLevel.PUBLIC;
    } else {
        return PermLevel.VETERAN;
    }
}

export function escapeRegex(regex: string) {
    return regex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
