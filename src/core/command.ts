import { Client, Message } from "discord.js";

class Command {
	public client: Client;
	public name: string;
	public description: string;
	public usage?: string;
	public args: boolean = false;
	public aliases: string[] = [];
	public category: string = "general";
	public cooldown: number = 1000;
	public cmdCooldown: Map<any, any>;
	public guildOnly: boolean = false;
	public ownerOnly: boolean = false;

	constructor(client) {
		this.client = client;
		this.cmdCooldown = new Map();
	}

	public async run(message: Message, arg: string[]) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

	public startCooldown(user) {
		this.cmdCooldown.set(user, this.cooldown);

		setTimeout(() => {
			this.cmdCooldown.delete(user);
		}, this.cooldown);
	}
}

export default Command;
