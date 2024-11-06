<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';

	export let handler: DataHandler;
	let value: string;
</script>

<input
	class="input sm:w-64 w-36"
	type="search"
	placeholder={$_('search')}
	bind:value
	on:input={() => handler.search(value)}
/>
