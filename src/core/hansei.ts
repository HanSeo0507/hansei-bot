import { Client, Collection } from "discord.js";
import path from "path";
import glob from "glob";

import Command from "./command";
import config from "src/config";

class Hansei extends Client {
	private commands: Collection<unknown, unknown>;
	private event: Collection<unknown, unknown>;
	private aliases: Collection<unknown, unknown>;

	constructor(options = {}) {
		super(options);
		this.commands = new Collection();
		this.event = new Collection();
		this.aliases = new Collection();
		console.log(`Client initialised. —— Node ${process.version}.`);
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	private loadCommands() {
		glob(`${this.directory}/commands/**/*.ts`, (error: Error, files: string[]) => {
			if (error) throw error;
			for (const file of files) {
				const filename = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

				const command = require(file)(this);
				if (!(command instanceof Command)) throw new TypeError(`${filename} does not seem to be a correct command...`);

				this.commands.set(command.name, command);
				command.aliases.length && command.aliases.map((alias) => this.aliases.set(alias, command.name));
			}
		});
	}

	private loadEvents() {
		glob(`${this.directory}/events/**/*.ts`, (error: Error, files: string[]) => {
			if (error) throw error;

			for (const file of files) {
				const eventname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
				const event = require(file)(this);

				if (event.enable) super.on(eventname, (...args) => event.run(...args));
			}
		});
	}

	private async clientLogin() {
		if (!config.token) throw new Error("No token provided");
		if (!config.neisAPI) throw new Error("No Neis Open API token provided");

		await super.login(config.token);
	}

	public init() {
		this.loadCommands();
		this.loadEvents();
		this.clientLogin();
	}
}

export default Hansei;
