function formatTime(seconds: number) {
	return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export { formatTime };
