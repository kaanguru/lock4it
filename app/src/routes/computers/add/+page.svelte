<script lang="ts">
	import { goto } from '$app/navigation';
	import AddComputerForm from '$lib/components/AddComputerForm.svelte';
	import { loggedIn } from '$lib/store';

	loggedIn.subscribe((l) => {
		if (!l) {
			goto('/');
		}
	});
</script>

<div class="flex justify-center max-w-lg">
	<AddComputerForm />
</div>
