import { goto } from '$app/navigation';
import { db } from '$lib/db';

export const load = async () => {
	const computers = await db.computers.limit(99).toArray();
	if (computers.length < 1) {
		goto('/computers/add');
	}

	return { computers };
};
