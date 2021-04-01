import { Message } from "discord.js";
import { Command } from "src/core";
import { IClient } from "src/@types";

class Exmaple extends Command {
	constructor(client) {
		super(client);
		this.name = "example";
		this.description = "command description";
		this.usage = "how to use this command";
		this.args = true; // if need arguments, set true
		this.aliases = ["set", "command", "aliases"];
		this.category = "set command category"; // if not set, it'll be general
		this.cooldown = 1000; //set command cooldown
		this.ownerOnly = true; //if use this commnad only owner, set true
		this.guildOnly = true; //if use this commnad only in guild, set true
	}

	public async run(message: Message, arg: string[]) {
		message.channel.send("pong");
	}
}

export default (client: IClient) => new Exmaple(client);
