<script lang="ts">
	let valueUsername: string;
	let valuePassword: string;
	async function signin() {
		const userInfo = { username: valueUsername, password: valuePassword };
		const response = await fetch('/api/signin', {
			method: 'POST',
			body: JSON.stringify(userInfo)
		});
		console.log(await response.json());
	}
</script>

<div>
	<input
		id="username"
		type="text"
		alt="username"
		maxlength="32"
		placeholder="username"
		bind:value={valueUsername}
	/>
	<input
		id="password"
		type="password"
		alt="password"
		maxlength="32"
		placeholder="password"
		bind:value={valuePassword}
	/>
	<button on:click={signin}>Sign In</button>
</div>

<style lang="scss">
</style>
