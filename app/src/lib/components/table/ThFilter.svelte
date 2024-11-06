<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';

	export let handler: DataHandler;
	export let filterBy: string;
	let value: string;
</script>

<th>
	<input
		class="input text-sm w-full"
		type="text"
		placeholder={$_('filter')}
		bind:value
		on:input={() => {
			if (filterBy) handler.filter(value, filterBy);
		}}
	/>
</th>
