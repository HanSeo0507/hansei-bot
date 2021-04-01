import { IClient } from "src/@types";

class Event {
	public enable: boolean = false;
	public client: IClient;

	constructor(client: IClient) {
		this.client = client;
	}
}

export default Event;
