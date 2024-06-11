import { CustomError } from '$lib/customError';

export const POST = async ({ request }) => {
	let bodyData = await request.json();
	return new Response(JSON.stringify(bodyData));
};
