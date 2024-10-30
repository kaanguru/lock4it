import { z } from 'zod';
import Dexie from 'dexie';

// eslint-disable-next-line no-useless-escape
const macRegex = /^([0-9A-Fa-f]{2}[\.:\-]{1})+[0-9A-Fa-f]{2}$/;
// Schema and interfaces
export const _computerSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(3, { message: 'Computer needs longer name' }),
	ipAddress: z.string().ip().optional(),
	macAddress: z.string().regex(macRegex).max(17).optional(),
	memory: z.number().optional(),
	processor: z.string().optional(),
	motherBoard: z.string().optional(),
	windowsVersion: z.string().optional(),
	monitor: z.string().optional(),
	videoAdaptor: z.string().optional(),
	disk1: z.string().optional(),
	disk2: z.string().optional(),
	removeConnectionSoftware: z.string().optional(),
	remoteConnectionId: z.string().optional(),
	remoteConnectionPass: z.string().optional(),
	officeLocationId: z.number().optional(),
	notes: z.string().optional(),
	softwareIDs: z.array(z.number()).optional(),
	printerIDs: z.array(z.number()).optional()
});

export interface Computer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
	id?: number | string;
	name: string;
	ipAddress?: string | undefined;
	macAddress?: string | undefined;
	memory?: number | undefined;
	processor?: string | undefined;
	motherBoard?: string | undefined;
	windowsVersion?: string | undefined;
	monitor?: string | undefined;
	videoAdaptor?: string | undefined;
	disk1?: string | undefined;
	disk2?: string | undefined;
	removeConnectionSoftware?: string | undefined;
	remoteConnectionId?: string | undefined;
	remoteConnectionPass?: string | undefined;
	officeLocationId?: number | undefined;
	notes?: string | undefined;
	softwareIDs?: number[] | undefined;
	printerIDs?: number[] | undefined;
}
export interface Setting {
	id?: number;
	key: string;
	value: string;
}
export interface Token {
	id?: number;
	token: string;
}
// Database class
export class Lock4ITDatabase extends Dexie {
	computers!: Dexie.Table<Computer>;
	settings!: Dexie.Table<Setting, number>;
	authToken!: Dexie.Table<Token>;
	constructor() {
		super('Lock4ITDatabase');
		this.version(1).stores({
			computers: '++id, name, ipAddress, &macAddress, &remoteConnectionId',
			settings: '++id, key',
			authToken: 'id,token'
		});
		this.computers = this.table('computers');
		this.settings = this.table('settings');
		this.authToken = this.table('authToken');
	}
}
// CRLUD operations
export async function addComputer(computer: Computer): Promise<void> {
	try {
		await db.computers.add({
			...computer
		});
	} catch (error) {
		console.error('Error adding computer:', error);
		throw error;
	}
}
export async function editComputer(computer: Computer): Promise<void> {
	try {
		// Check if the computer object has an 'id' field
		if (!computer.id) {
			throw new Error('Computer ID is required to edit a computer.');
		}

		// Update the computer record in the database
		await db.computers.update(computer.id, {
			...computer
		});
	} catch (error) {
		console.error('Error updating computer:', error);
		throw error; // Rethrow the error to be handled by the caller
	}
}
export async function deleteComputer(id: number | string): Promise<void> {
	try {
		await db.computers.delete(id);
	} catch (error) {
		console.error('Error deleting computer:', error);
		throw error; // Rethrow the error to be handled by the caller
	}
}
export async function setToken(token: string): Promise<void> {
	try {
		await db.authToken.put({
			id: 0,
			token: token
		});
	} catch (error) {
		console.error('Error seting token:', error);
		throw error;
	}
}

export const db = new Lock4ITDatabase();
export async function exportComputersData(): Promise<Computer[]> {
	try {
		const computers = await db.computers.toArray();
		return computers.map((computer) => ({
			...computer
		}));
	} catch (error) {
		console.error('Error exporting computers data:', error);
		throw error;
	}
}
export async function importDatabase(data: Computer[]) {
	await db.computers.clear();
	data.forEach(async (computer) => {
		await db.computers.add(computer);
	});
}
