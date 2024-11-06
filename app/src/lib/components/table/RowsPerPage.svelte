<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';

	export let handler: DataHandler;
	const rowsPerPage = handler.getRowsPerPage();
	const options = [5, 10, 20, 50, 100];
</script>

<aside class="flex place-items-center">
	{$_('show')}
	<select class="select ml-2" bind:value={$rowsPerPage}>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</aside>
