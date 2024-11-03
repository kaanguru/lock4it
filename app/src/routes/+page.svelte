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
		if (data?.secret.length > 9) {
			try {
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
			} catch (error) {
				console.log('ℹ  ~ unlock ~ error:', error);
			}
		} else {
			console.log('ℹ  ~ unlock ~ NO SECRET in env');
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
		<p>
			It's your first visit to this IT inventory app. <br />
			Please set a master password to get started.
		</p>
		<img src="img/lock4it-logo.png" alt="logo" class="m-auto" />
		<p>
			Please, enter a strong password! <br />
			It will be your
			<strong>Master Password</strong>
			after all
		</p>
		<form on:submit|preventDefault={saveMasterPass}>
			<MainPasswordInputArea needsTypoCheck submit="Save Your Master Password" on:update={handleUpdate}
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
	form {
		@apply m-auto;
	}
</style>
