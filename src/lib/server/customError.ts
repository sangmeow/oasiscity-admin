export class CustomError extends Error {
	private code: string | undefined;
	private status?: number;
	constructor(code: string, message: string, status?: number) {
		super(message);
		this.code = code;
		if (status) this.status = status;
	}
}
