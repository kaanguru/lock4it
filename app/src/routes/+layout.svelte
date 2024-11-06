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
	addMessages('ar', ar);
	addMessages('en', en);
	addMessages('ru', ru);
	addMessages('tr', tr);
	addMessages('zh', zh);

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});

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
	<TabAnchor href="/" selected={$page.url.pathname === '/'} title="$_('home')">
		<svelte:fragment slot="lead">
			<img src="/img/lock4it-logo.png" alt="lock4it" class="align-middle mt-2 max-h-14" />
		</svelte:fragment>
	</TabAnchor>
	{#if computersTabVisible}
		<TabAnchor href="/computers" title="$_('computers')" selected={$page.url.pathname === '/computers'}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="fxemoji:threenetworkedcomputers" height="2em"></iconify-icon>
			</svelte:fragment>
			<span>{$_('computers')}</span>
		</TabAnchor>
		<TabAnchor href="/settings" title="Settings" selected={$page.url.pathname === '/settings'}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="arcticons:quick-settings" height="2em"></iconify-icon>
			</svelte:fragment>
			<span>{$_('settings')}</span>
		</TabAnchor>
	{/if}
</TabGroup>

<!-- Page Route Content -->
<div class="flex justify-center">
	<slot />
</div>
