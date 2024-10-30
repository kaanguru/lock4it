import { writable } from 'svelte/store';

export const selectedComputer = writable();
export const loggedIn = writable(false);
export const errorStopSubmition = writable(false);
