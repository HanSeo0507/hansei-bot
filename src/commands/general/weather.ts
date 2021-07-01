import { Command } from "src/core";
import { IClient } from "src/@types";
import { Message } from "discord.js";
import axios from "axios";
import weatherDatas from "src/resources/weather";
import { fillZero } from "src/utils";
import { title } from "node:process";

const weatherAPI = axios.create({
	baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
	params: {
		ServiceKey: "sC0cXwY2OFAprycTszB0VkYqLEP9T8BXnwwZ5YwU73dCkZFMcz+ZG6b0t2nAcUdcYE0WVcLGT8UD9iecKX5CHA==",
		dataType: "json",
		numOfRows: 999,
	},
});

class Weather extends Command {
	constructor(client) {
		super(client);
		this.name = "날씨";
		this.category = "일반";
		this.description = "입력하신 지역의 날씨를 안내합니다";
		this.usage = "한세야 날씨 (지역명 - 기본값: 서울특별시 마포구 아현동) *선택옵션*)";
	}

	public async run(message: Message, args: string[]) {
		try {
			let city = args[0] || "",
				country = args[1] || "",
				dong = args[2] || "";

			if (city === "") (city = "서울특별시"), (country = "마포구"), (dong = "아현동");

			const weather = weatherDatas.find((v) => v["1단계"] === city && v["2단계"] === country && v["3단계"] === dong);

			const today = new Date();

			const {
				data: {
					response: {
						body: {
							items: { item },
						},
					},
				},
			} = await weatherAPI.get("/getVilageFcst", {
				params: {
					nx: weather.X,
					ny: weather.Y,
					base_date: `${today.getFullYear()}${fillZero(today.getMonth() + 1)}${fillZero(today.getDate())}`,
					base_time: `0800`,
				},
			});

			const ptyEmoji = ["☀️", "🌧", "🌧🌨", "🌨", "🌧"];
			const ptyTypes = [" 맑음", "비", "비/눈", "눈", "소나기"];

			const TMP = item.find((v) => v.category === "TMP").fcstValue;
			const PTY = item.find((v) => v.category === "PTY").fcstValue;
			const REH = item.find((v) => v.category === "REH").fcstValue;

			const TMN = item.find((v) => v.category === "TMN").fcstValue;
			const TMX = item.find((v) => v.category === "TMX").fcstValue;

			const POP = item.find((v) => v.category === "POP").fcstValue;

			let title = "";
			if (city !== "") title = title + city;
			if (country !== "") title = title + " " + country;
			if (dong !== "") title = title + " " + dong;

			const embed = {
				color: "BLUE",
				title: `${ptyEmoji[PTY]} ${title}의 날씨`,
				description: "",
				fields: [
					{ name: "날씨", value: ptyTypes[PTY], inline: true },
					{ name: "현재기온", value: TMP + "°C", inline: true },
					{ name: "습도", value: REH + "%", inline: true },

					{ name: "최저기온", value: TMN + "°C", inline: true },
					{ name: "최고기온", value: TMX + "°C", inline: true },
					{ name: "최고기온", value: TMX + "°C", inline: true },

					{ name: "강수확률", value: POP + "%", inline: true },
				],

				timestamp: new Date(),
			};
			message.channel.send({ embed });
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
	return new Weather(client);
};
