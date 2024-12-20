<script lang="ts">
	import { preventDefault, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from 'svelte';
	import { setMessage, superForm, defaults, dateProxy } from 'sveltekit-superforms/client';
	import { _computerSchema, editComputer, type Computer } from '$lib/db';
	import { selectedComputer } from '$lib/store';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Accordion, AccordionItem, getModalStore } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';

	const modalStore = getModalStore();

	const { form, errors, constraints, enhance, message } = superForm(defaults(zod(_computerSchema)), {
		id: 'edit-form',
		SPA: true,
		validators: zod(_computerSchema),
		onUpdate: handleSubmit
	});
	let computerGettingEdited = $state();
	selectedComputer.subscribe((sc) => (computerGettingEdited = sc));
	onMount(() => {
		prefillForm(computerGettingEdited);
	});
	async function handleSubmit({ form }: { form: any }) {
		if (form.valid) {
			form.data.id = computerGettingEdited?.id;
			await editComputer(form.data);
			setMessage(form, `${$_('computer')} : ${form.data.name} ${$_('has_been_updated')}`);
		} else {
			setMessage(form, $_('form_is_invalid'));
		}
	}

	const remoteConnectionSoftwares = [$_('anydesk'), $_('teamviewer'), 'RustDesk', $_('parsec'), $_('other')];
	let selectedRemoteConnectionSoftware = $state('');
	function updateSelectedRemoteConnectionSoftware(selSof: string): void {
		selectedRemoteConnectionSoftware = selSof;
		$form.removeConnectionSoftware = selSof;
	}
	function prefillForm(comptr: Computer) {
		for (const key in comptr) {
			if (comptr.hasOwnProperty(key)) {
				$form[key] = comptr[key];
			}
		}
	}
</script>

<div class="flex flex-col mx-auto max-w-lg px-3">
	<h2>
		Edit Computer <iconify-icon icon="line-md:computer"></iconify-icon>
	</h2>
	<form method="POST" use:enhance>
		<label>
			<span>{$_('name')}</span>
			<input
				title="Name"
				type="text"
				placeholder={computerGettingEdited?.name}
				class={$errors.name ? 'input-error' : undefined}
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="error">{$errors.name}</span>{/if}
		</label>
		<Accordion class="btn-group-vertical variant-ghost-primary">
			<AccordionItem>
				{#snippet summary()}
							
						<iconify-icon icon="lucide:cable"></iconify-icon>
						{$_('remote_connectio')}
					
							{/snippet}
				{#snippet content()}
							
						<input title="removeConnectionSoftware" type="hidden" bind:value={$form.removeConnectionSoftware} />
						{#each remoteConnectionSoftwares as sof}
							<button
								class="chip {selectedRemoteConnectionSoftware === sof ? 'variant-filled' : 'variant-soft'}"
								onclick={preventDefault(() => {
								updateSelectedRemoteConnectionSoftware(sof);
							})}
								onkeypress={bubble('keypress')}
							>
								{#if selectedRemoteConnectionSoftware === sof}<span>✅</span>{/if}
								<span>{sof}</span>
							</button>
						{/each}
						<label>
							<span>{$_('remote_connectio-0')}</span>
							<input
								title="remoteConnectionId"
								type="text"
								class={$errors.remoteConnectionId ? 'input-error' : undefined}
								aria-invalid={$errors.remoteConnectionId ? 'true' : undefined}
								bind:value={$form.remoteConnectionId}
								{...$constraints.remoteConnectionId}
							/>
							{#if $errors.remoteConnectionId}<span class="error">{$errors.remoteConnectionId}</span>{/if}
						</label>
						<label>
							<span>{$_('remote_connectio-1')}</span>
							<input
								title="remoteConnectionPass"
								type="password"
								class={$errors.remoteConnectionPass ? 'input-error' : undefined}
								aria-invalid={$errors.remoteConnectionPass ? 'true' : undefined}
								bind:value={$form.remoteConnectionPass}
								{...$constraints.remoteConnectionPass}
							/>
							{#if $errors.remoteConnectionPass}<span class="error">{$errors.remoteConnectionPass}</span>{/if}
						</label>
					
							{/snippet}
			</AccordionItem>
			<AccordionItem>
				{#snippet summary()}
							
						<iconify-icon icon="lucide:network"></iconify-icon>
						Network
					
							{/snippet}
				{#snippet content()}
							
						<label>
							<span>{$_('ip_address')}</span>
							<input
								title="IP Address"
								type="text"
								placeholder="IP Address"
								class={$errors.ipAddress ? 'input-error' : undefined}
								aria-invalid={$errors.ipAddress ? 'true' : undefined}
								bind:value={$form.ipAddress}
								{...$constraints.ipAddress}
							/>
							{#if $errors.ipAddress}<span class="error">{$errors.ipAddress}</span>{/if}
						</label>
						<label>
							<span>{$_('mac_address')}</span>
							<input
								title="Mac Address"
								type="text"
								placeholder="Mac Address"
								class={$errors.macAddress ? 'input-error' : undefined}
								aria-invalid={$errors.macAddress ? 'true' : undefined}
								bind:value={$form.macAddress}
								{...$constraints.macAddress}
							/>
							{#if $errors.macAddress}<span class="error">{$errors.macAddress}</span>{/if}
						</label>
					
							{/snippet}
			</AccordionItem>
			<AccordionItem>
				{#snippet summary()}
							
						<iconify-icon icon="lucide:cpu"></iconify-icon>
						{$_('hardware')}
					
							{/snippet}
				{#snippet content()}
							
						<label>
							<span>{$_('memory_ram_in_gb')}</span>
							<input
								title="Memory"
								type="number"
								placeholder="8"
								class={$errors.memory ? 'input-error' : undefined}
								aria-invalid={$errors.memory ? 'true' : undefined}
								bind:value={$form.memory}
								{...$constraints.memory}
							/>
							{#if $errors.memory}<span class="error">{$errors.memory}</span>{/if}
						</label>
						<label>
							<span>{$_('processor')}</span>
							<input
								title="processor"
								type="text"
								placeholder="i7"
								class={$errors.processor ? 'input-error' : undefined}
								aria-invalid={$errors.processor ? 'true' : undefined}
								bind:value={$form.processor}
								{...$constraints.processor}
							/>
							{#if $errors.processor}<span class="error">{$errors.processor}</span>{/if}
						</label>
						<label>
							<span>{$_('mother_board')}</span>
							<input
								title="motherBoard"
								type="text"
								placeholder="MSI AS"
								class={$errors.motherBoard ? 'input-error' : undefined}
								aria-invalid={$errors.motherBoard ? 'true' : undefined}
								bind:value={$form.motherBoard}
								{...$constraints.motherBoard}
							/>
							{#if $errors.motherBoard}<span class="error">{$errors.motherBoard}</span>{/if}
						</label>
						<label>
							<span>{$_('monitor')}</span>
							<input
								title="monitor"
								type="text"
								class={$errors.monitor ? 'input-error' : undefined}
								aria-invalid={$errors.monitor ? 'true' : undefined}
								bind:value={$form.monitor}
								{...$constraints.monitor}
							/>
							{#if $errors.monitor}<span class="error">{$errors.monitor}</span>{/if}
						</label>
						<label>
							<span>{$_('video_adaptor')}</span>
							<input
								title="videoAdaptor"
								type="text"
								class={$errors.videoAdaptor ? 'input-error' : undefined}
								aria-invalid={$errors.videoAdaptor ? 'true' : undefined}
								bind:value={$form.videoAdaptor}
								{...$constraints.videoAdaptor}
							/>
							{#if $errors.videoAdaptor}<span class="error">{$errors.videoAdaptor}</span>{/if}
						</label>
						<label>
							<span>{$_('disk_1')}</span>
							<input
								title="disk1"
								type="text"
								class={$errors.disk1 ? 'input-error' : undefined}
								aria-invalid={$errors.disk1 ? 'true' : undefined}
								bind:value={$form.disk1}
								{...$constraints.disk1}
							/>
							{#if $errors.disk1}<span class="error">{$errors.disk1}</span>{/if}
						</label>
						<label>
							<span>{$_('disk_2')}</span>
							<input
								title="disk2"
								type="text"
								class={$errors.disk2 ? 'input-error' : undefined}
								aria-invalid={$errors.disk2 ? 'true' : undefined}
								bind:value={$form.disk2}
								{...$constraints.disk2}
							/>
							{#if $errors.disk2}<span class="error">{$errors.disk2}</span>{/if}
						</label>
					
							{/snippet}
			</AccordionItem>
		</Accordion>
		<label>
			<iconify-icon icon="lucide:notebook-pen"></iconify-icon>
			<span class="text-end">{$_('notes')}</span>
			<picture>
				<source media="(min-width: )" srcset="" />
				<img src="" alt="" />
			</picture>
			<textarea
				title="notes"
				class={$errors.notes ? 'input-error' : undefined}
				aria-invalid={$errors.notes ? 'true' : undefined}
				bind:value={$form.notes}
				{...$constraints.notes}
			></textarea>
			{#if $errors.notes}<span class="error">{$errors.notes}</span>{/if}
		</label>
		<div class="flex justify-around">
			<button>
				<iconify-icon icon="lucide:plus-circle" width="1.2rem" height="1.2rem" class="pr-4"></iconify-icon>
				{$_('edit_computer')}
			</button>
			<button
				onclick={() => {
					modalStore.close();
				}}
				aria-label="cancel"
				class="text-error-200 ms-2"
			>
				<iconify-icon icon="lucide:circle-x" width="1.2rem" height="1.2rem"></iconify-icon>
			</button>
		</div>
		{#if $message}<p>{$message}</p>{/if}
	</form>
</div>
