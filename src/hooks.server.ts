import type { Handle } from '@sveltejs/kit';

export function handleError({ error, event, status, message }) {
	const anyError: any = error;
	console.log(error);
	return {
		path: event.request.url,
		code: anyError.code,
		status: anyError.status || status,
		message: anyError.message,
		serverMessage: message
	};
}
