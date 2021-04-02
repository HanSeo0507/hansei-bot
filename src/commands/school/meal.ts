import { Message } from "discord.js";
import Neis from "@my-school.info/neis-api";

import config from "src/config";
import { Command } from "src/core";
import { IClient } from "src/@types";
import { formatDate } from "src/core/utils";

const neis = new Neis({ KEY: config.neisAPI, Type: "json" });

class Meal extends Command {
	constructor(client) {
		super(client);
		this.name = "급식";
		this.category = "school";
		this.description = "오늘, 내일, 특정일의 급식을 안내합니다";
		this.usage = "한세야 급식 (오늘|내일|특정일(YYYYMMDD) *선택옵션*)";
	}

	public async run(message: Message, args: string[]) {
		try {
			if (!args[0]) args[0] = "오늘";

			const dateTypes = {
				오늘: new Date(),
				내일: new Date(new Date().setDate(new Date().getDate() + 1)),
			};

			if (dateTypes[args[0]] || parseInt(args[0]) !== NaN || args[0].length === 8) {
				const dateType = dateTypes[args[0]];

				const date = dateType ? formatDate(dateType, false) : args[0];
				const displayDate = dateType ? formatDate(dateType, true) : `${date.slice(0, 4)}.${date.slice(5, 6)}.${date.slice(7, 8)}`;

				//prettier-ignore
				const { [0]: { DDISH_NM, CAL_INFO } } = await neis.getMealInfo({ ATPT_OFCDC_SC_CODE: "B10", SD_SCHUL_CODE: "7010911", MLSV_YMD: date });
				const meals = DDISH_NM.replace(/([1-9]|[1-9]{1}[0-9]{1})\./g, "").replace(/<br\/>/g, ", ");

				const embed = {
					color: "GREEN",
					title: `🍱 ${dateType ? args[0] : displayDate} 급식`,
					description: `**${dateType ? dateType : displayDate} 급식의 칼로리: ${CAL_INFO}**\n\`\`\`${meals}\`\`\`\n*자세한 사항은 [이곳](http://hansei.sen.hs.kr/50649/subMenu.do)을 눌러주세요*`,
				};

				message.channel.send({ embed });
			}
		} catch (error) {
			const embed = {
				color: "RED",
				title: "⛔️ 에러가 발생했습니다",
				description: error.message,
			};

			message.channel.send({ embed });
		}
	}
}

export = (client: IClient) => {
	return new Meal(client);
};
