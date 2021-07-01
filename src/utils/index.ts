export const fillZero = (value: string | number) => {
	if (value.toString().length === 1) value = "0" + value;

	return value;
};
