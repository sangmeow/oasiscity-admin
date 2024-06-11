<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';

	export function load() {
		redirect(302, '/');
	}
</script>

<form method="POST">
	<input id="username" type="text" alt="username" maxlength="32" placeholder="username" />
	<input id="password" type="password" alt="password" maxlength="32" placeholder="password" />
	<button formaction="?/login">Sign In</button>
	<button formaction="?/register">Register</button>
</form>

<style lang="scss">
</style>
