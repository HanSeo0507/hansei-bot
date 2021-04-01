import { Message } from "discord.js";
import { IClient } from "src/@types";
import config from "src/config";
import Event from "../core/event";

class MessageEvent extends Event {
	constructor(client: IClient) {
		super(client);
		this.enable = true;
	}

	public async run(message: Message) {
		if (message.author.bot || message.author.system) return;
		if (!message.content.startsWith(config.prefix)) return;

		const [cmd, ...args] = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command: any = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (!command) return;

		if (command.cmdCooldown.has(message.author.id)) return message.delete({ timeout: 10000 }) && message.reply(command.cmdCooldown.get(message.author.id) / 1000).then((msg) => msg.delete({ timeout: 10000 }));
		if (command.ownerOnly && config.ownerId !== message.author.id) return message.reply("명령어 사용 권한이 없습니다");
		if (command.guildOnly && !message.guild) return message.reply("서버에서 명령어를 사용해주세요");
		if (command.args && !args.length) return message.channel.send(!command.usage || "");

		command.run(message, args);
		if (command.cooldown > 0) command.startCooldown(message.author.id);
	}
}

export = (client: IClient) => {
	return new MessageEvent(client);
};
