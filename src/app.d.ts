// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			path: string;
			code: string;
			status: number;
			message: string;
			serverMessage: string;
		}
		interface Locals {
			requestParam: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
