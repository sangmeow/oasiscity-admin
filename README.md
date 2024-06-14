# 관리자 페이지

임시 프로젝트 용 관리자 서버

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# 임시 프로젝트 용 관리자 서버

## Refresh Modules

```
> rm -rf node_modules
> rm -f package-lock.json
> npm cache clean --force
> yarn install
```

## Error Handler

src/hooks.server.ts 에 아래와 같은 코드가 존재한다. Hooks에서 handleError는 SvelteKit server-side에서 Error가 발생하면 해당 Error를 catch하여 해당 함수가 실행한다.

```typescript
export function handleError({ error, event, status, message }) {
	const anyError: any = error;
	return {
		path: event.request.url,
		code: anyError.code,
		status: anyError.status || status,
		message: anyError.message,
		serverMessage: message
	};
}
```

에러 메시지 양식이 전달되니 위해서는 src/app.d.ts.에 에러 인터페이스를 작성해야 한다.

```typescript
declare global {
	namespace App {
		interface Error {
			path: string;
			code: string;
			status: number;
			message: string;
			serverMessage: string;
		}
	}
}

export {};
```
