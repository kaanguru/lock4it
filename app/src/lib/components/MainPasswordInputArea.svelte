<script lang="ts">
	import { errorStopSubmition } from '$lib/store';
	import { createEventDispatcher } from 'svelte';
	export let submit: string;

	let plainTextPassword: string;
	let controlTextPassword: string;
	export let needsTypoCheck: boolean = false;
	const dispatch = createEventDispatcher();
	let visiblePasswordInputArea = false;

	function toggleEye() {
		visiblePasswordInputArea = !visiblePasswordInputArea;
	}
	function updateValue(event: Event) {
		plainTextPassword = (event.target as HTMLInputElement).value;
		dispatch('update', plainTextPassword);
	}

	function stopSubmitionIfTypo(): void {
		if (plainTextPassword !== controlTextPassword) {
			errorStopSubmition.set(true);
		} else {
			errorStopSubmition.set(false);
		}
	}
</script>

<div class="input-group input-group-divider grid-cols-[1fr_auto]">
	<input
		title="main-password"
		type={visiblePasswordInputArea ? 'text' : 'password'}
		bind:value={plainTextPassword}
		placeholder="Enter main password"
		required
		autocomplete="new-password"
		on:input={updateValue}
	/>
	<button type="button" on:click={toggleEye} class="btn-icon btn-icon-md variant-filled">
		{#if visiblePasswordInputArea}
			<iconify-icon icon="la:eye"></iconify-icon>
		{:else}
			<iconify-icon icon="la:eye-slash"></iconify-icon>
		{/if}
	</button>
</div>
{#if needsTypoCheck}
	<div class="input-group input-group-divider grid-cols-[1fr_auto] mt-2">
		<input
			type={visiblePasswordInputArea ? 'text' : 'password'}
			placeholder="Re-Type your password"
			required
			autocomplete="new-password"
			bind:value={controlTextPassword}
		/>
		<button type="button" on:click={toggleEye} class="btn-icon btn-icon-md variant-filled">
			{#if visiblePasswordInputArea}
				<iconify-icon icon="la:eye"></iconify-icon>
			{:else}
				<iconify-icon icon="la:eye-slash"></iconify-icon>
			{/if}
		</button>
	</div>
{/if}
<button type="submit" on:click={() => stopSubmitionIfTypo()}>{submit}</button>
