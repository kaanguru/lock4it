<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { goto, invalidateAll } from '$app/navigation';
	import { setToken } from '$lib/db';
	import MainPasswordInputArea from '$lib/components/MainPasswordInputArea.svelte';
	import CryptoES from 'crypto-es';
	import { errorStopSubmition, loggedIn } from '$lib/store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	const toastStore = getToastStore();
	let { data } = $props();
	let plainTextPassword: string;
	let shortPassword = $state(false);
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
						message: $_('invalid_p')
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
					background: 'variant-filled-success',
					message: `${$_('you_have_locked')}`,
					timeout: 300
				});
				loggedIn.set(true);
				invalidateAll();
				goto('/computers');
			} else {
				shortPassword = true;
			}
		} else {
			toastStore.trigger({
				message: $_('passwords_do_not')
			});
		}
	}
	if (data.firstTime) {
		console.log('ℹ  ~ load ~ firstTime');
	}
</script>

<div class="middle-container">
	{#if data.firstTime}
		<h1>{$_('hello_stranger')}</h1>
		<p>
			{$_('first_visit_app')}
			<br />
			{$_('please_set_a_mas')}
		</p>
		<img src="img/lock4it-logo.png" alt="logo" class="m-auto" />
		<p>
			{$_('please_enter_a_s')}
			<br />
			{$_('it_will_be_your')}
		</p>
		<form onsubmit={preventDefault(saveMasterPass)}>
			<MainPasswordInputArea needsTypoCheck submit={$_('save_your_master')} on:update={handleUpdate}
			></MainPasswordInputArea>
		</form>
	{:else}
		<h1>{$_('hello_friend')}</h1>
		<span>
			<img src="img/lock4it-logo-bw.webp" class="h-7 w-28" alt="Lock4IT Locked it" />
			has Locked it
		</span>
		<p>{$_('enter_your_passw')}</p>
		<form onsubmit={preventDefault(unlock)}>
			<MainPasswordInputArea submit={$_('unlock')} on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	{/if}
	{#if shortPassword}
		<h4>{$_('try_longer_passw')}</h4>
	{/if}
</div>

<style>
	.middle-container {
		@apply flex flex-col text-center;
	}
	form {
		@apply m-auto;
	}
</style>
