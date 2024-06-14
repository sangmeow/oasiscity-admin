export function handleError({ error, event, status, message }) {
	const anyError: any = error;
	const errorResponse = {
		path: event.request.url,
		code: anyError.code,
		status: anyError.status || status,
		message: anyError.message,
		serverMessage: message
	};
	console.log(error, errorResponse);
	return errorResponse;
}
