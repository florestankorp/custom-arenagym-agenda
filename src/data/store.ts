import { writable, type Writable } from 'svelte/store';
import { Weekday, type Training } from '../models';

export const trainingsData$: Writable<Map<Weekday, Training[]> | null> = writable(null);
export const trainingsDataImmutable$: Writable<Map<Weekday, Training[]> | null> = writable(null);
export const titles$ = writable(new Map<string, boolean>());
