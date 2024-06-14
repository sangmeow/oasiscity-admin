export const dataBind = (body: any, entity: any): any => {
	Object.keys(body).forEach((v) => (entity[v] = body[v]));
	return entity;
};
