<script lang="ts">
	import { errorStopSubmition } from '$lib/store';
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';


	let plainTextPassword: string = $state();
	let controlTextPassword: string = $state();
	interface Props {
		submit: string;
		needsTypoCheck?: boolean;
	}

	let { submit, needsTypoCheck = false }: Props = $props();
	const dispatch = createEventDispatcher();
	let visiblePasswordInputArea = $state(false);

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
		id="password-input"
		title="main-password"
		type={visiblePasswordInputArea ? 'text' : 'password'}
		bind:value={plainTextPassword}
		placeholder={$_('enter_master_pas')}
		required
		autocomplete="new-password"
		oninput={updateValue}
	/>
	<button type="button" onclick={toggleEye} class="btn-icon btn-icon-md variant-filled">
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
			placeholder={$_('re_type_your_pas')}
			required
			autocomplete="new-password"
			bind:value={controlTextPassword}
		/>
		<button type="button" onclick={toggleEye} class="btn-icon btn-icon-md variant-filled">
			{#if visiblePasswordInputArea}
				<iconify-icon icon="la:eye"></iconify-icon>
			{:else}
				<iconify-icon icon="la:eye-slash"></iconify-icon>
			{/if}
		</button>
	</div>
{/if}
<button type="submit" onclick={() => stopSubmitionIfTypo()} class="btn variant-filled-secondary">
	<iconify-icon icon="noto:unlocked" width="1.3rem" height="1.3rem" class="pe-4"></iconify-icon>
	{submit}
</button>
