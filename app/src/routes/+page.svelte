<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { setToken } from '$lib/db';
	import MainPasswordInputArea from '../lib/components/MainPasswordInputArea.svelte';
	import CryptoES from 'crypto-es';
	import { errorStopSubmition, loggedIn } from '$lib/store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	export let data;
	let plainTextPassword: string;
	let shortPassword = false;
	loggedIn.subscribe((v) => {
		if (v) {
			goto('/computers');
		} else {
			goto('/');
		}
	});
	function handleUpdate(event: CustomEvent<string>) {
		plainTextPassword = event.detail;
	}
	async function unlock() {
		const hash = CryptoES.HmacMD5(plainTextPassword, data.secret);
		if (data.authToken.token && data.authToken.token === hash.toString(CryptoES.enc.Base64)) {
			loggedIn.set(true);
		} else {
			(document.querySelector('input') as HTMLInputElement).value = '';
			plainTextPassword = '';
			toastStore.trigger({
				message: 'Invalid password,Please try again'
			});

			loggedIn.set(false);
		}
	}

	async function saveMasterPass() {
		if (!$errorStopSubmition) {
			if (plainTextPassword.length > 3) {
				shortPassword = false;
				const hash = CryptoES.HmacMD5(plainTextPassword, data.secret);
				setToken(hash.toString(CryptoES.enc.Base64));

				toastStore.trigger({
					message: `You have Locked IT`
				});
				loggedIn.set(true);
				invalidateAll();
				goto('/computers');
			} else {
				shortPassword = true;
			}
		} else {
			toastStore.trigger({
				message: '⚠️  Passwords do not match.'
			});
		}
	}
	if (data.firstTime) {
		console.log('ℹ  ~ load ~ firstTime');
	}
</script>

<div class="orta-kolon">
	{#if data.firstTime}
		<h1>Hello stranger!</h1>
		<img src="img/lock4it-logo.png" alt="logo" />
		<p>Enter a strong Password which will be your main password after all</p>
		<form on:submit|preventDefault={saveMasterPass}>
			<MainPasswordInputArea needsTypoCheck submit="Save Your Main Password" on:update={handleUpdate}
			></MainPasswordInputArea>
		</form>
	{:else}
		<h1>Hello friend!</h1>
		<img src="img/lock4it-logo.png" alt="logo" />
		<p>Enter your Password to go on</p>
		<form on:submit|preventDefault={unlock}>
			<MainPasswordInputArea submit="UnLock" on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	{/if}
	{#if shortPassword}
		<h4>Try longer password</h4>
	{/if}
</div>

<style>
	img {
		@apply py-9;
	}
	.orta-kolon {
		@apply flex flex-col text-center;
	}
</style>
