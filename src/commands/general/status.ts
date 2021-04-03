import { Message, version } from "discord.js";
import os from "os";
import osUtils from "os-utils";

import { Command } from "src/core";
import { IClient } from "src/@types";
import { formatTime } from "core/utils";

class Status extends Command {
	constructor(client) {
		super(client);
		this.name = "상태";
		this.category = "일반";
		this.aliases = ["서버상태"];
		this.description = "봇을 호스팅 중인 서버의 상태를 안내합니다";
		this.cooldown = 5000;
	}

	public async run(message: Message, args: string[]) {
		await osUtils.cpuUsage((cpuUsage) => {
			const embed = {
				color: "BLUE",
				title: "📊 서버 상태",

				fields: [
					{ name: "CPU", value: `${os.cpus()[0].model}`, inline: true },
					{ name: "CPU 사용량", value: `${cpuUsage.toFixed(2)}%`, inline: true },
					{ name: "메모리 사용량", value: `${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)} / ${os.totalmem() / 1024 / 1024} MB`, inline: true },

					{ name: "서버 업타임", value: formatTime(os.uptime()), inline: true },
					{ name: "봇 업타임", value: formatTime(this.client.uptime), inline: true },
					{ name: "\u200b", value: "\u200b", inline: true },

					{ name: "Node.js", value: process.version, inline: true },
					{ name: "Discord.js", value: version, inline: true },
					{ name: "\u200b", value: "\u200b", inline: true },
				],

				timestamp: new Date(),
			};

			message.channel.send({ embed });
		});
	}
}

export = (client: IClient) => {
	return new Status(client);
};
