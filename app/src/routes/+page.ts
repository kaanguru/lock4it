import { db } from '$lib/db';
export const load = async () => {
	const secret = import.meta.env.VITE_PUBLIC_SECRET_KEY;

	const authTokenCount = await db.authToken.count();
	const authToken = await db.authToken.get(0) ;
	const firstTime = authTokenCount === 0;

	return {
		secret,
		firstTime,
		authToken
	};
};
