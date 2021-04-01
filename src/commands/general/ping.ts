import { Client, Message } from "discord.js";
import { Command } from "src/core";
import { IClient } from "src/@types";

class Ping extends Command {
	constructor(client) {
		super(client);
		this.name = "ping";
		this.description = "get ping";
		this.ownerOnly = true;
	}

	public async run(message: Message, arg: string[]) {
		message.channel.send("pong");
	}
}

export = (client: IClient) => {
	return new Ping(client);
};
