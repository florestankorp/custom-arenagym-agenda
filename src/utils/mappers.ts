/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { getDay } from 'date-fns/getDay';
import { titles$ } from '../data/store';
import { SELECT_ALL, ShowRangeEnum, Weekday, type Training } from '../models';

function updateTitlesStore(title: string | null): void {
	if (title === null) {
		return;
	}

	titles$.update((titles) => {
		titles.set(title, true);

		// Sort the titles alphabetically
		return new Map([
			[SELECT_ALL, true],
			...[...titles.entries()].sort((valueA, valueB) => valueA[0].localeCompare(valueB[0])),
		]);
	});
}

export function initializeMap(): Map<Weekday, Training[]> {
	const initializedMap = new Map<Weekday, Training[]>();

	Object.values(Weekday).forEach((key) => {
		if (typeof key === 'number') {
			initializedMap.set(key, []);
		}
	});

	return initializedMap;
}

export function mapHTMLToData(html: string, showRange: ShowRangeEnum): Map<Weekday, Training[]> {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const itemsDayElements = doc.querySelectorAll('.items-day');
	const allTrainings = initializeMap();
	const dateFnsSunday = 0;
	const arenaGymSunday = 6;

	const weekdayToday =
		getDay(new Date()) === dateFnsSunday ? arenaGymSunday : getDay(new Date()) - 1;

	// Iterate over each 'items-day' element
	itemsDayElements.forEach((itemsDayElement, index) => {
		const ochtendElement = itemsDayElement.querySelector('.ochtend');
		const middagElement = itemsDayElement.querySelector('.middag');
		const avondElement = itemsDayElement.querySelector('.avond');

		[ochtendElement, middagElement, avondElement].forEach((daytime) => {
			if (daytime === null) {
				return;
			}

			daytime.querySelectorAll('.evtitem').forEach((evtitem) => {
				const title = evtitem.querySelector('.title')?.textContent ?? null;
				const time = evtitem.querySelector('.time')?.textContent ?? null;
				const trainer = evtitem.querySelector('.trainer')?.textContent ?? null;

				updateTitlesStore(title);

				allTrainings.get(index)?.push({
					time,
					title,
					trainer,
				});
			});
		});
	});

	if (showRange === ShowRangeEnum.Today) {
		const todayTrainings = allTrainings.get(weekdayToday);
		const todaysTrainings = new Map<Weekday, Training[]>();
		todaysTrainings.set(weekdayToday, todayTrainings ?? []);

		return todaysTrainings;
	}

	return allTrainings;
}
