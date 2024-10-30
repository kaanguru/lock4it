import { db, type Computer } from '$lib/db';

import { error } from '@sveltejs/kit';
export const load = async ({ params }) => {
	if (!params.id) throw error(404, 'ID not provided.');
	const selectedComputer: Computer = await db.computers.where('id').equals(parseInt(params.id)).first();
	if (!selectedComputer) throw error(404, 'Computer not found. ' + params.id);
	return { selectedComputer };
};
