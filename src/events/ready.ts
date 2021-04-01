import gradient from "gradient-string";
import chalk from "chalk";
import os from "os";

import { Event } from "src/core";
import { IClient } from "src/@types";

class ReadyEvent extends Event {
	constructor(client: IClient) {
		super(client);
		this.enable = true;
	}

	public async run() {
		console.clear();

		//prettier-ignore
		console.log(
            chalk.bold(
                gradient("#FDFC47", "#24FE41")([
                    " _   _                      _       ____        _ ",  
                    "| | | | __ _ _ __  ___  ___(_)     | __ )  ___ | |_ ",
                    "| |_| |/ _` | '_ \\/ __|/ _ \\ |_____|  _ \\ / _ \\| __|",
                    "|  _  | (_| | | | \\__ \\  __/ |_____| |_) | (_) | |_ ",
                    "|_| |_|\\__,_|_| |_|___/\\___|_|     |____/ \\___/ \\__|",          
                    "\n",
                ].join("\n")),
            ),

            `${chalk.bold("Connected")} — ${this.client.user.tag} is ${chalk.green("logined")}!\n`,
            `On ${chalk.blueBright(this.client.guilds.cache.size + " servers")}, for ${chalk.blueBright(this.client.users.cache.size + " users")} and ${chalk.blueBright(this.client.channels.cache.size + " channels")}\n`,
            `${this.client.user.tag} is online, hosted by ${chalk.hex("#FDC830")(os.hostname())}\n`,
           
        );
	}
}

export = (client: IClient) => {
	return new ReadyEvent(client);
};
