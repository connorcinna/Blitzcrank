import {Client, Intents, Collection, AnyChannel, ClientOptions} from 'discord.js'

export type ApplicationCommandOptionChoice = {
    readonly name: String;
    readonly value: String | number;
}
  
export type ApplicationCommandOption = {
    readonly type: number;
    readonly name: String;
    readonly description: String;
    readonly required?: Boolean;
    readonly choices?: Array<ApplicationCommandOptionChoice>;
    readonly options?: Array<ApplicationCommandOption>;
  
}
  
export interface ApplicationCommandModule {
    readonly name: String;
    readonly description: String;
    readonly options?: Array<ApplicationCommandOption>;
    readonly default_permission?: Boolean;
    readonly permissions: PermissionString = 'SEND_MESSAGES';
    readonly usage: String;
    readonly devOnly?: Boolean;
    readonly run: (message: Message, args?: Array<T>) => any;
}