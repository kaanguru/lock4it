import { exportComputersData } from '$lib/db';

export const load = async () => {
	return {
		computers: await exportComputersData()
	};
};
