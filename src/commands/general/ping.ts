import { Message } from "discord.js";

import { Command } from "src/core";
import { IClient } from "src/@types";

class Ping extends Command {
	constructor(client) {
		super(client);
		this.name = "핑";
		this.description = "서버와 디스코드 API간의 지연속도를 안내합니다";
		this.cooldown = 5000;
	}

	public async run(message: Message, args: string[]) {
		const embed = {
			color: "RED",
			title: "🏓 퐁.....",

			fields: [
				{ name: "서버 지연", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
				{ name: "디스코드 API 지연", value: `${Math.round(this.client.ws.ping)}ms`, inline: true },
			],

			timestamp: new Date(),
		};
		message.channel.send({ embed });
	}
}

export = (client: IClient) => {
	return new Ping(client);
};
