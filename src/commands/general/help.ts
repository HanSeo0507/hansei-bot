import { Message } from "discord.js";

import { Command } from "src/core";
import { IClient } from "src/@types";

class Help extends Command {
	constructor(client) {
		super(client);
		this.name = "도움말";
		this.category = "일반";
		this.aliases = ["도움", "사용법"];
		this.description = "봇의 커맨드들의 사용법을 안내합니다";
	}

	public async run(message: Message, args: string[]) {
		const embed = {
			color: "GREEN",
			title: "📜 한세봇 도움말",

			fields: this.client.commands.map((v: any, k) => {
				return { name: `${v.name} (${v.category})`, value: `${v.description}${v.usage ? `\n\`\`${v.usage}\`\`` : ""}`, inline: true };
			}),
		};

		message.channel.send({ embed });
	}
}

export = (client: IClient) => {
	return new Help(client);
};
