function formatTime(seconds: number) {
	return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function formatZero(number: number) {
	return number > 9 ? number.toString() : 0 + number.toString();
}

function formatDate(date: Date, isDisplay: boolean) {
	if (isDisplay) {
		return formatZero(date.getFullYear()) + "." + formatZero(date.getMonth() + 1) + "." + formatZero(date.getDate());
	}
	return formatZero(date.getFullYear()) + formatZero(date.getMonth() + 1) + formatZero(date.getDate());
}

export { formatTime, formatDate };
