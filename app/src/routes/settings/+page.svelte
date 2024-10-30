<script lang="ts">
	import { onMount } from 'svelte';
	import { exportComputersData, importDatabase, type Computer } from '$lib/db';
	import { PrepareForExportThenSave } from '$lib/ComputerExporter';
	import { decryptData } from '$lib/crypt';
	let computers: Computer[] = [];
	let saver: PrepareForExportThenSave;
	let imported: boolean = false;
	onMount(async () => {
		computers = await exportComputersData();
		saver = new PrepareForExportThenSave(computers);
	});
	function handleImport(): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.bak';
		input.click();

		input.onchange = async (event: Event) => {
			const target = event.target as HTMLInputElement;
			if (target.files?.length) {
				const file = target.files[0];
				const selectedFile: string = await new Response(file).json();
				try {
					const computers: Computer[] = JSON.parse(await decryptData(selectedFile))[0];
					await importDatabase(computers);
					imported = true;
				} catch (error) {
					//error
					console.log('decrypt failed', error);
					alert('Decrypt failed: file format or master password is wrong');
					return;
				}
			}
		};
	}
</script>

<div id="import">
	{#if computers.length == 0}
		<h3>No computers found. Please import a backup file first.</h3>
	{:else}
		<button type="button" on:click={() => saver.handleExport()}>Export computers Data</button>
		<p>Click the "Export computers Data" button to export your data.</p>
	{/if}

	<div id="upload">
		<button type="button" on:click={() => handleImport()}>Import your backup file</button>
		<p>Please upload your backup file (.bak) to restore your data.</p>
		{#if imported}
			<p class="success">Files imported successfully!</p>
			<p>Here is the list of computers imported:</p>
			<ul>
				{#each computers as computer}
					<li>{computer.name}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	button {
		@apply mx-3 text-slate-100;
	}
	p {
		@apply text-sm pb-9 mx-4;
	}
	#upload,
	#import {
		@apply flex flex-col items-center justify-center my-4;
	}
	.success {
		@apply text-success-900 text-xl;
	}
</style>
