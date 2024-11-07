<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';

	interface Props {
		handler: DataHandler;
	}

	let { handler }: Props = $props();
	let value: string = $state();
</script>

<input
	class="input sm:w-64 w-36"
	type="search"
	placeholder={$_('search')}
	bind:value
	oninput={() => handler.search(value)}
/>
