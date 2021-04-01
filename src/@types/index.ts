import { Client, Collection, Message } from "discord.js";

interface IClient extends Client {
	commands: Collection<unknown, unknown>;
	event: Collection<unknown, unknown>;
	aliases: Collection<unknown, unknown>;
}

interface ICommand {
	client: Client;
	name: string;
	description: string;
	usage?: string;
	args: boolean;
	aliases: string[];
	category: string;
	cooldown: number;
	cmdCooldown: Map<any, any>;
	guildOnly: boolean;
	ownerOnly: boolean;

	run(meesage: Message, args?: string[]): Promise<void>;
	startCooldown(user: string | number): void;
}

export { IClient, ICommand };
