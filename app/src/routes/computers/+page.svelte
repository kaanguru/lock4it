<script lang="ts">
	import { _computerSchema } from '$lib/db';
	import { goto } from '$app/navigation';
	import { DataHandler } from '@vincjo/datatables';
	import Search from '$lib/components/table/Search.svelte';
	import ThFilter from '$lib/components/table/ThFilter.svelte';
	import ThSort from '$lib/components/table/ThSort.svelte';
	import RowCount from '$lib/components/table/RowCount.svelte';
	import RowsPerPage from '$lib/components/table/RowsPerPage.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { loggedIn } from '$lib/store';
	import { _ } from 'svelte-i18n';

	loggedIn.subscribe((v) => {
		if (!v) {
			goto('/');
		}
	});
	export let data;
	const handler = new DataHandler(data.computers, { rowsPerPage: 10 });
	const rows = handler.getRows();
	function navigateToComputer(i: string | number) {
		goto(`/computers/computer/${i.toString()}`);
		return null;
	}
</script>

<div class="max-w-lg flex flex-col">
	<a href="/computers/add" class="btn variant-soft-primary mb-8" data-sveltekit-preload-data="hover">
		<span>{$_('add_new_computer')}</span>
		<span class="ps-2">
			<iconify-icon icon="tabler:device-imac-plus" height="2em"></iconify-icon>
		</span>
	</a>
	<h2 class="text-center">{$_('computers')}</h2>

	<div class="p-2 overflow-x-auto space-y-9">
		<header class="flex justify-between gap-4">
			<Search {handler} />
			<RowsPerPage {handler} />
		</header>
		<table class="table table-hover table-auto w-full">
			<thead>
				<tr>
					<ThSort {handler} orderBy="name">{$_('name')}</ThSort>
					<ThSort {handler} orderBy="ipAddress">{$_('ip_address')}</ThSort>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="name" />
					<ThFilter {handler} filterBy="ipAddress" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr class="h-14" on:click={row.id ? navigateToComputer(row.id) : undefined}>
						<td class="font-semibold px-16">{row.name}</td>
						{#if row.ipAddress}
							<td class="td-ip">{row.ipAddress}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
		<footer class="flex justify-between">
			<RowCount {handler} />
			<Pagination {handler} />
		</footer>
	</div>
</div>

<style>
	.td-ip {
		@apply border-s-2 border-secondary-50;
	}
</style>
