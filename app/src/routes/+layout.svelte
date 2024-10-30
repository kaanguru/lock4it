<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup, Modal, TabGroup, TabAnchor, Toast } from '@skeletonlabs/skeleton';
	import EditComputerForm from '$lib/components/EditComputerForm.svelte';
	import { page } from '$app/stores';
	import { version } from '$app/environment';
	import { loggedIn } from '$lib/store';
	import { goto } from '$app/navigation';
	let computersTabVisible = false;

	loggedIn.subscribe((v) => {
		if (v) {
			computersTabVisible = true;
		} else {
			computersTabVisible = false;
			goto('/');
		}
	});
	const modalRegistry = {
		EditComputerForm: { ref: EditComputerForm }
	};
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<Modal components={modalRegistry} />
<Toast />
<TabGroup
	justify="justify-center"
	active="variant-filled-primary text-primary-100"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full mb-6"
>
	<TabAnchor href="/" selected={$page.url.pathname === '/'} title="Home">
		<svelte:fragment slot="lead">
			<img src="/img/lock4it-logo.png" alt="lockit" class="h-10 ps-1 pb-2" />
		</svelte:fragment>
		<span class="text-xs">v{version}</span>
	</TabAnchor>
	{#if computersTabVisible}
		<TabAnchor href="/computers" title="Computers" selected={$page.url.pathname === '/computers'}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="fxemoji:threenetworkedcomputers" height="2em"></iconify-icon>
			</svelte:fragment>
			<span>Computers</span>
		</TabAnchor>
		<TabAnchor href="/settings" title="Settings" selected={$page.url.pathname === '/settings'}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="arcticons:quick-settings" height="2em"></iconify-icon>
			</svelte:fragment>
			<span>Settings</span>
		</TabAnchor>
	{/if}
</TabGroup>

<!-- Page Route Content -->
<div class="flex justify-center">
	<slot />
</div>
