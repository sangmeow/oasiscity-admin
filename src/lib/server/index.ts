// place files you want to import through the `$lib` alias in this folder.

export const getMapFromList = (object: any, array: string[]): any => {
	let returnData: any = {};
	array.forEach((v) => {
		if (object[v]) {
			returnData[v] = object[v];
		}
	});
	return returnData;
};
