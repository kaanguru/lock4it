<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup, Modal, TabGroup, TabAnchor, Toast } from '@skeletonlabs/skeleton';
	import EditComputerForm from '$lib/components/EditComputerForm.svelte';
	import { page } from '$app/stores';
	import { loggedIn } from '$lib/store';
	import { goto } from '$app/navigation';
	import { addMessages, init, getLocaleFromNavigator, _ } from 'svelte-i18n';
	import ar from '$lib/i18n/locales/ar.json';
	import en from '$lib/i18n/locales/en.json';
	import ru from '$lib/i18n/locales/ru.json';
	import tr from '$lib/i18n/locales/tr.json';
	import zh from '$lib/i18n/locales/zh.json';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	addMessages('ar', ar);
	addMessages('en', en);
	addMessages('ru', ru);
	addMessages('tr', tr);
	addMessages('zh', zh);

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});

	let computersTabVisible = $state(false);

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
	<TabAnchor href="/" selected={$page.url.pathname === '/'} title="$_('home')">
		{#snippet lead()}
			
				<img src="/img/lock4it-logo.png" alt="lock4it" class="align-middle mt-2 max-h-14" />
			
			{/snippet}
	</TabAnchor>
	{#if computersTabVisible}
		<TabAnchor href="/computers" title="$_('computers')" selected={$page.url.pathname === '/computers'}>
			{#snippet lead()}
					
					<iconify-icon icon="fxemoji:threenetworkedcomputers" height="2em"></iconify-icon>
				
					{/snippet}
			<span>{$_('computers')}</span>
		</TabAnchor>
		<TabAnchor href="/settings" title="Settings" selected={$page.url.pathname === '/settings'}>
			{#snippet lead()}
					
					<iconify-icon icon="arcticons:quick-settings" height="2em"></iconify-icon>
				
					{/snippet}
			<span>{$_('settings')}</span>
		</TabAnchor>
	{/if}
</TabGroup>

<!-- Page Route Content -->
<div class="flex justify-center">
	{@render children?.()}
</div>
<div class="flex justify-end mt-6 p-3">
	<LightSwitch />
</div>
