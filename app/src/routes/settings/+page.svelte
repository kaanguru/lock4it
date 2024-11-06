<script lang="ts">
	import { onMount } from 'svelte';
	import { exportComputersData, importDatabase, type Computer } from '$lib/db';
	import { PrepareForExportThenSave } from '$lib/ComputerExporter';
	import { decryptData } from '$lib/crypt';
	import { version } from '$app/environment';
	import { _ } from 'svelte-i18n';

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

<div>
	<span class="text-xs">
		<img src="/img/lock4it-logo-bw.webp" alt="Lock4IT" />
		v{version}
	</span>
	<div id="import">
		{#if computers.length == 0}
			<h3>{$_('no_computers_fou')}</h3>
		{:else}
			<button type="button" on:click={() => saver.handleExport()}>{$_('export_computers')}</button>
			<p>{$_('click_the_export')}</p>
		{/if}

		<div id="upload">
			<button type="button" on:click={() => handleImport()}>{$_('import_your_back')}</button>
			<p>{$_('please_upload_yo')}</p>
			{#if imported}
				<p class="success">{$_('files_imported_s')}</p>
				{#if computers.length > 0}
					<p>{$_('here_is_the_list')}</p>
					<ul>
						{#each computers as computer}
							<li>{computer.name}</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</div>
	</div>
</div>
<div>
	<button
		type="button"
		class="btn btn-sm variant-filled"
		on:click={() => window.location.reload()}
		aria-label="Reload page to LockIT"
	>
		<iconify-icon icon="fxemoji:lock" class="pe-2"></iconify-icon>
		Lock
	</button>
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
