<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';

	interface Props {
		handler: DataHandler;
		filterBy: string;
	}

	let { handler, filterBy }: Props = $props();
	let value: string = $state();
</script>

<th>
	<input
		class="input text-sm w-full"
		type="text"
		placeholder={$_('filter')}
		bind:value
		oninput={() => {
			if (filterBy) handler.filter(value, filterBy);
		}}
	/>
</th>
